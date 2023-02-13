// import React from 'react'
// import { useLocation } from 'react-router-dom'

// const EditStatement = () => {
//     const location = useLocation()
//     const { statement, category, id } = location.state
//     console.log(statement, category, id)
//   return (
//     <div>EditStatement</div>
//   )
// }

// export default EditStatement;
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import DropD from './Dropdowns';
import Model from './Model';

const EditStatement = () => {
    const [dropdownData, setDropdownData] = useState([]);
    const [popupValue, setPopupVAlue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentWord, setCurreWord] = useState("");
    const [currentIndex, setCurreIndex] = useState(0);
    const [optionArr, setOptionArr] = useState([]);
    const [data, setData] = useState([]);
    const [updatedStatement, setUpdatedStatement] =useState([]);
    const [questionData, setQuestionData] = useState({

    })


  const navigate = useNavigate();
    const [statementData1, setStatementData1] = useState({
        category:'',
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
    const { statement, category, id, dropdowns } = location.state;
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
        setUpdatedStatement(prevArray => {
            return [...prevArray.slice(0, currentIndex), e, ...prevArray.slice(currentIndex + 1)];
          });

    }

    console.log(statement, category, id, dropdowns, "fro paramas ans location")

    const handleSubmitStatement=()=>{
        // console.log(statementData1, "my last submition");
        // const citiesRef = collection(db, 'categories');
        // addDoc(collection(citiesRef, category, 'questions'), {
        //     category:category,
        //     question: statementData1.question,
        //     dropdown: statementData1.dropdown
        // })
        //     .then(() => {
        //         alert("new question added successfully!")
        //         navigate("/")
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

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
            dropdown: dropdowns
        })

        console.log(dropdowns, "you are trying this")
        setQuestionData(statementData);
        setOptionArr(statementData.dropdown[currentIndex])
    }, [])
    return (
        <section className="splited__section">
            <h2>Choose a word to edit</h2>
            {data.length > 0 && data.map((item, index) => (
                <button type="button" className="splited__questions btn btn-light" name={item} id={index} onClick={(e) => { handleOption(e); }}>{item}</button>
            ))}

            {optionArr.length > 0 && <DropD keys={currentWord} data={optionArr} choosenOption={handleChoosedOption} className="top" />}

            {isOpen && <Model isOpen={handleIsOpen} onSaveData={handleOnSaveData} name={currentWord} />}

            <section className="splited__section">
                {updatedStatement.length > 0 && updatedStatement.map((item) => (
                    <button type="button" className="splited__questions btn btn-light">{item}</button>
                ))}

                <button type="submit"  className='btn btn-success' id="lname" name="lname" onClick={handleSubmitStatement}>Submit this statement</button>
            </section>
        </section>
    )
}

export default EditStatement;