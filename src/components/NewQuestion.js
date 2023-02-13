import { useState, useId, useEffect } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropD from './Dropdowns';
import { addDoc, collection } from 'firebase/firestore';
import Model from './Model';
import { db } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function NewQuestion() {
    const [data, setData] = useState({});
    const [result, setResult] = useState([]);
    const [testResult, setTestResult] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [popupValue, setPopupVAlue] = useState('');
    const [createQuestion, setCreateQuestion] = useState(false);
    const [dropdownData, setDropdownData] = useState([]);
    const [changeCategory, setChangeCategory] = useState("");
    const [display, setDisplay] = useState("none");
    const [storage, setStorage] = useState([]);
    const [statement, setSatatement] = useState([]);
    const [questionData, setQuestionData] = useState([]);
    const [previousOptions, setpreviousOptions] = useState([]);
    const [spacificDropdown, setSpecificDropDown] = useState([])
    const [clickedIndex, setClickedIndex] = useState([]);
    const [clickedWord, setclickedWord] = useState('');
    const [addOption, setAddOption] = useState({});
    useEffect(() => {
        localStorage.setItem('dataKey', JSON.stringify(storage));
    }, [storage]);

    const [lastResult, setlastResult] = useState([]);
    const navigate = useNavigate();


    const id = useId();
    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(data.split(/(\s+)/).filter((e) => e.trim().length > 0));
        let splittedStatement = data.split(/(\s+)/).filter((e) => e.trim().length > 0);
        const tempArr = [];
        const options = {};

        splittedStatement.forEach((value, index) => {
            options[index] = []
        })

        options[clickedIndex] = previousOptions;
        const statementData = {
            question: data,
            dropdown: options,
        };

        setQuestionData(statementData);
        console.log(statementData, "statement data");
        splittedStatement.forEach((item, index) => {
            tempArr.push({
                name: item,
                dropdowns: [],
                category: changeCategory,
            })
        })
        setSatatement(splittedStatement);
        setTestResult(tempArr)
        setIsNew(false)
    };


    const handleOption = (e) => {
        const clickedWord = e.target.name;
        const index = statement.indexOf(clickedWord);
        setClickedIndex(index);
        setclickedWord(clickedWord)
        console.log(e.target.name);
        console.log('statement', statement)
        console.log(clickedWord, 'index= ', index);
        setpreviousOptions(questionData.dropdown[index])
        setSpecificDropDown(questionData.dropdown[index])


        // Statement that user entered
        // questionData object
        // index of the clicked work. To get the index we need the whole statement
        // const index = statement.indexOf(clickedWork) done
        // questionData['dropdown/options']['index'].push(newOption)
        // Also show the previously entered data in the popup dropdown
        setPopupVAlue(e.target.name);
        setIsOpen((current) => !current);
    };

    const handleIsOpen = () => {
        setIsOpen(false);
    };

    const handleOnSaveData = (e) => {
        setpreviousOptions(e);
        console.log(clickedIndex, e, "__________________");
        testResult.map(item => {
            if (item.name === popupValue) {
                item.dropdowns = [...e]
                setStorage(item);
            }
        })
        setDropdownData(e);
        setCreateQuestion(true);
        setDisplay("block")
        // console.log(e, "Array from dropdown")
    };

    const handleChoosenOption = (e) => {
        // console.log(result,"yyyydyy")
        testResult.map(res => {
            console.log(res, "res");
        })
        // console.log(result,"This is a result")
        // const arr = [...result]
        // const index = arr.indexOf(popupValue);
        // if (index !== -1) {
        //     arr[index] = e;
        // }
        // setlastResult([...arr])



    }

    const handleSubmittion = () => {

        const citiesRef = collection(db, 'categories');
        addDoc(collection(citiesRef, changeCategory, 'questions'), {
            category: changeCategory,
            question: lastResult.join(' '),
            question1: testResult
        })
            .then(() => {
                alert("new question added successfully!")
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    // console.log(testResult, lastResult)

    return (
        <div>
            <Sidebar />
            <div className="App">
                <section className='new__statement'>
                    <h1>Create A new Statement</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Select a category:
                            <select onChange={(e) => {
                                setChangeCategory(e.target.value);
                            }}>
                                <option value="" >Select a category</option>
                                <option value="health">Health</option>
                                <option value="education">Education</option>
                                <option value="sports">Sports</option>
                            </select>
                        </label>
                        <textarea onChange={(e) => { setData(e.target.value); }} />
                        <Link to='/options' state={{ statement:data, category:changeCategory }} class="btn btn-primary" variant='primary'>Submit</Link>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default NewQuestion;
