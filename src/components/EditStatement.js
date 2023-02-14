import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { useLocation, useNavigate } from 'react-router-dom';
import DropD from './Dropdowns';
import Model from './Model';
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-2DDqmQme6uZMfz64ezdcS3NT",
    apiKey: process.env.REACT_APP_API_KEY
});
const openai = new OpenAIApi(configuration);

const EditStatement = () => {
    const [text, setText] = useState("Copy this text to clipboard");
    const [isCopied, setIsCopied] = useState(false);
    const [popupValue, setPopupVAlue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentWord, setCurreWord] = useState("");
    const [currentIndex, setCurreIndex] = useState(0);
    const [optionArr, setOptionArr] = useState([]);
    const [data, setData] = useState([]);
    const [updatedStatement, setUpdatedStatement] = useState([]);
    const [questionData, setQuestionData] = useState({

    })

    const [solution, setSolution] = useState('');


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
        const newArray = [...updatedStatement];
        newArray[currentIndex] = e;
        setUpdatedStatement(newArray);

    }

    const handleSubmitStatement = async () => {



        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: updatedStatement.join(" "),
            max_tokens: 100,
            temperature: 0,
        });

        setSolution(response.data.choices[0].text);
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

                <button type="submit" className='btn btn-success' id="lname" name="lname" onClick={handleSubmitStatement}>Find an answer</button>
            </section>

           

            <div className="App-container">
      <div className="card">
        <div className="card-header">
          <h4 className="title">Here is the answer</h4>
        </div>
 
        <div className="card-body">
          <textarea
            type="text"
            value={text}
            onChange={({ target }) => {
              setText(target.value);
            }}
            placeholder="Enter Message"
            className="text-area"
          />
 
          {isCopied ? (
            <p className="success-msg">Text copied to clipboard</p>
          ) : null}
 
          <CopyToClipboard
            text={solution}
            onCopy={() => {
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1000);
            }}
          >
            <button className="btn">COPY</button>
          </CopyToClipboard>
 
        </div>
      </div>
    </div>
        
        </section>
    )
}

export default EditStatement;