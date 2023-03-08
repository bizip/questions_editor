import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Puff } from 'react-loader-spinner';
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
  const [isCopied, setIsCopied] = useState(false);
  const [popupValue, setPopupVAlue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentWord, setCurreWord] = useState("");
  const [currentIndex, setCurreIndex] = useState(0);
  const [optionArr, setOptionArr] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [updatedStatement, setUpdatedStatement] = useState([]);
  const [storageItems, setStorageItems] = useState([]);
  const [data1, setData1] = useState([]);

  const [questionData, setQuestionData] = useState({

  })

  const [solution, setSolution] = useState('');
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

  const handleDirectChoosedOption = (e) => {
    const newArray = [...updatedStatement];
    newArray[e.target.name] = e.target.value;
    setUpdatedStatement(newArray);
  }
  const handleSubmitStatement = async () => {
    console.log(`${updatedStatement.join(" ")}. Make it an HTML section`);
    setHasSubmitted(true);
    setIsLoading(true);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      // replace prompt with messages and set prompt as content with a role.
        messages: [{role: "user", content: `${updatedStatement.join(" ")}. Make it an HTML section`}]
    });
    setSolution(response.data.choices[0].message.content);
    setIsLoading(false);

    handleAddItem(response.data.choices[0].message.content);

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

    setQuestionData(statementData);
    setOptionArr(statementData.dropdown[currentIndex])
  }, [])
  
  const [list, setList] = useState([]);
  const [list1, setList1] = useState([]);


  useEffect(() => {
    const savedList = localStorage.getItem('myList');
    if (savedList) {
      setList(JSON.parse(savedList));
    }
  }, []);

  const handleAddItem =async (result) => {
    let splitted =result.split("\n\n");
    let title = splitted[1];
    let summary =splitted[3];
    const prevArr =[...list];
    prevArr.push({id: Date.now(), text: result, title,summary});
    localStorage.setItem('myList', JSON.stringify(prevArr));
  };
  return (
    <>

      {!hasSubmitted && <section className='drop_sections'>
        <h2>Configuration</h2>
        {Object.keys(dropdowns).map(item => {
          if (item === '8') {
            if (dropdowns[item].length > 0) {
              return <div className='opt_box'>
                <label>Which phase is the clinical trial?</label>
                <select className="edit_dropdowns" name={8} id="questions" onChange={handleDirectChoosedOption}>
                  {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item} >{item}</option>))}
                </select>
              </div>
            }
          } else if ((item === '9')) {
            return <div className='opt_box'>
              <label> What type of randomization?</label>
              <select className="edit_dropdowns" name={9} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item} >{item}</option>))}
              </select>
            </div>
          } else if ((item === '10')) {
            return <div className='opt_box'>
              <label> What type of blinding?</label>
              <select className="edit_dropdowns" name={10} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '11')) {
            return <div className='opt_box'>
              <label>  What type of control?</label>
              <select className="edit_dropdowns" name={11} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '14')) {
            return <div className='opt_box'>
              <label>Intervention Name</label>
              <input type="text" className="edit_dropdowns" id="numberInput" placeholder='eg: covax' name={14} onChange={handleDirectChoosedOption} />
            </div>
          } else if ((item === '16')) {
            return <div className='opt_box'>
              <label>How many patients are participating in the study?</label>
              <input type="text" className="edit_dropdowns" id="numberInput" placeholder='eg: 16' name={16} onChange={handleDirectChoosedOption} />
            </div>
          } else if ((item === '21')) {
            return <div className='opt_box'>
              <label>How often will data be collected?</label>
              <select className="edit_dropdowns" name={21} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '23')) {
            return <div className='opt_box'>
              <label>How will data be collected?</label>
              <select className="edit_dropdowns" name={23} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '27')) {
            return <div className='opt_box'>
              <label>What is the minimum age requirement for participants?</label>
              <input type="text" className="edit_dropdowns" id="numberInput" placeholder='eg: 27' name={27} onChange={handleDirectChoosedOption} />
            </div>
          } else if ((item === '31')) {
            return <div className='opt_box'>
              <label>How often must a participant experience [disease] to be eligible for the study?</label>
              <input type="text" className="edit_dropdowns" id="numberInput" placeholder='eg: 3 episodes' name={31} onChange={handleDirectChoosedOption} />
            </div>
          } else if ((item === '35')) {
            return <div className='opt_box'>
              <label>Are there any exclusion criteria for the study?</label>
              <select className="edit_dropdowns" name={35} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '40')) {
            return <div className='opt_box'>
              <label>How will the intervention be administered?</label>
              <select className="edit_dropdowns" name={40} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '41')) {
            return <div className='opt_box'>
              <label>How often will the intervention be administered?</label>
              <select className="edit_dropdowns" name={41} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '44')) {
            return <div className='opt_box'>
              <label>For how long will the treatment be administered</label>
              <select className="edit_dropdowns" name={44} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '52')) {
            return <div className='opt_box'>
              <label>Primary outcome to be measured</label>
              <select className="edit_dropdowns" name={52} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '61')) {
            return <div className='opt_box'>
              <label>Primary outcome assessment mode</label>
              <select className="edit_dropdowns" name={61} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '67')) {
            return <div className='opt_box'>
              <label>Statistics method</label>
              <select className="edit_dropdowns" name={67} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '70')) {
            return <div className='opt_box'>
              <label>Significance level</label>
              <select className="edit_dropdowns" name={70} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '79')) {
            return <div className='opt_box'>
              <label>Correction method</label>
              <select className="edit_dropdowns" name={79} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '89')) {
            return <div className='opt_box'>
              <label>Who will manage and monitor data?</label>
              <select className="edit_dropdowns" name={89} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '98')) {
            return <div className='opt_box'>
              <label>Data quality and accuracy method</label>
              <select className="edit_dropdowns" name={98} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '103')) {
            return <div className='opt_box'>
              <label>Study time length</label>
              <select className="edit_dropdowns" name={103} id="questions" onChange={handleDirectChoosedOption}>
                {dropdowns[item].length > 0 && dropdowns[item].map((item) => (<option value={item}>{item}</option>))}
              </select>
            </div>
          } else if ((item === '111')) {
            return <div className='opt_box'>
              <label>Budget provider name</label>
              <input type="text" className="edit_dropdowns" id="numberInput" placeholder='eg: Pascal' name={111} onChange={handleDirectChoosedOption} />
            </div>
          } else if ((item === '117')) {
            return <div className='opt_box'>
              <label>Study Budget</label>
              <input type="text" className="edit_dropdowns" id="numberInput" placeholder='$50 000' name={117} onChange={handleDirectChoosedOption} />
            </div>
          }
        })}

        <button type="submit" className='btn btn-success' id="lname" name="lname" onClick={handleSubmitStatement}>Find an answer</button>
      </section>
      }
      {isLoading ? <div className="loader">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="rgb(77, 159, 146)"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div> : <section dangerouslySetInnerHTML={{ __html: solution }} className="ans">
      </section>

      }
    </>
  )
}

export default EditStatement;