import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../utils/firebase';
import DropD from '../Dropdowns';
import Model from '../Model';

const ChooseOption = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentWord, setCurreWord] = useState("");
    const [currentIndex, setCurreIndex] = useState(0);
    const [optionArr, setOptionArr] = useState([]);
    const [data, setData] = useState([]);
    const [updatedStatement, setUpdatedStatement] = useState([]);
    const [questionData, setQuestionData] = useState({

    })

    const navigate = useNavigate();
    const [statementData1, setStatementData1] = useState({
        category: '',
        question: '',
        dropdown: {}
    });

    const handleData = (index, newValue) => {
        setStatementData1(prevState => {
            const options = { ...prevState.dropdown };
            options[index] = newValue;
            return {
                ...prevState,
                dropdown: options
            };
        });
    };

    const location = useLocation()
    const { statement, category } = location.state
    const handleOption = (e) => {
        const clickedWord = e.target.name;
        const index = e.target.id;
        setCurreIndex(index);
        setCurreWord(clickedWord)
        setIsOpen(true);
        setOptionArr(statementData1.dropdown[currentIndex])
    };

    const handleIsOpen = () => {
        setIsOpen(false);
    };



    const handleOnSaveData = (e) => {
        handleData(currentIndex, e);
    };



    const handleChoosedOption = (e) => {
        const newArray = [...updatedStatement];
        newArray[currentIndex] = e;
        setUpdatedStatement(newArray);

    }

    const handleSubmitStatement = () => {
        const citiesRef = collection(db, 'categories');
        addDoc(collection(citiesRef, category, 'questions'), {
            category: category,
            question: statementData1.question,
            dropdown: statementData1.dropdown
        })
            .then(() => {
                alert("new question added successfully!")
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        let splittedStatement = statement.split(/(\s+)/).filter((e) => e.trim().length > 0);
        setData(splittedStatement);
        setUpdatedStatement(splittedStatement);
        const options = {};
        splittedStatement.forEach((value, index) => {
            options[index] = []
        })
        const statementData = {
            question: statement,
            dropdown: options,
        };
        setStatementData1({
            question: statement,
            dropdown: options
        })
        setQuestionData(statementData);
        setOptionArr(statementData.dropdown[currentIndex])
    }, [])
    return (
        <>
            <div className="statement_nav">
                <h1>Choose a word to add a dropdown</h1>
            </div>
            <section className="splited__section">
                <p className='guide'>Double click on a word to add a dropdown</p>
                {data.length > 0 && data.map((item, index) => (
                    <button type="button" className="splited__questions btn btn-light" name={item} id={index} onClick={(e) => { handleOption(e); }}>{item}</button>
                ))}
                <div className='for'>
                    {optionArr.length > 0 && <DropD keys={currentWord} data={optionArr} choosenOption={handleChoosedOption} />}
                </div>

                {isOpen && <Model isOpen={handleIsOpen} onSaveData={handleOnSaveData} name={currentWord} />}

                <section className="splited__section" id='draft'>
                <p className='guide'>This is a draft that is going to be updated as you update dropdown</p>
                    {updatedStatement.length > 0 && updatedStatement.map((item) => (
                        <button type="button" className="splited__questions btn btn-light">{item}</button>
                    ))}

                    <button type="submit" className='btn btn-success' id="lname" name="lname" onClick={handleSubmitStatement}>Submit this statement</button>
                </section>
            </section>
        </>
    )
}

export default ChooseOption;