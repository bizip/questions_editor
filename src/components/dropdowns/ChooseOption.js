import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DropD from '../Dropdowns';
import Model from '../Model';

const ChooseOption = () => {
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
    // +++++++++++++++++++++++++++++++++++++++++++++++++
    const [statementData1, setStatementData1] = useState({
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

    //   const newDropdown= (newDropdown) => {
    //     setStatementData1(prevState => {
    //       return {
    //         ...prevState,
    //         dropdown: newDropdown
    //       };
    //     });
    //   };
    // =================================================
    const location = useLocation()
    const { statement, category } = location.state
    const handleOption = (e) => {
        const clickedWord = e.target.name;
        // const index = statement.indexOf(clickedWord);
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

    // const handleUpdate = (e, currentWord) => {
    //     setUpdatedStatement(prevState => {
    //       const arr = [...prevState];
    //       const index = arr.indexOf(currentWord);
    //       if (index !== -1) {
    //         arr[index] = e;
    //       }
    //       return [...arr];
    //     });
    //   };


    //   const updateElement = (index, newValue) => {
    //     setData(prevArray => {
    //       return [...prevArray.slice(0, index), newValue, ...prevArray.slice(index + 1)];
    //     });
    //   };
      

    const handleChoosedOption = (e) => {
        console.log(e, currentIndex, "value from select box")
        // const arr = [...data]
        // const index = arr.indexOf(currentWord);
        // if (index !== -1) {
        //     arr[index] = e;
        // }
        // setUpdatedStatement([...arr])
        setUpdatedStatement(prevArray => {
            return [...prevArray.slice(0, currentIndex), e, ...prevArray.slice(currentIndex + 1)];
          });

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
        <section className="splited__section">
            <h2>Choose a word to add a dropdown</h2>
            {data.length > 0 && data.map((item, index) => (
                <button type="button" className="splited__questions btn btn-light" name={item} id={index} onClick={(e) => { handleOption(e); }}>{item}</button>
            ))}

            {optionArr.length > 0 && <DropD keys={currentWord} data={optionArr} choosenOption={handleChoosedOption} className="top" />}

            {isOpen && <Model isOpen={handleIsOpen} onSaveData={handleOnSaveData} name={currentWord} />}

            <section className="splited__section">
                {updatedStatement.length > 0 && updatedStatement.map((item) => (
                    <button type="button" className="splited__questions btn btn-light">{item}</button>
                ))}

                <button type="submit"  className='btn btn-success' id="lname" name="lname">Submit this statement</button>
            </section>
        </section>
    )
}

export default ChooseOption;