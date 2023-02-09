import { useState, useId, useEffect } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropD from './Dropdowns';
import { addDoc, collection } from 'firebase/firestore';
import Model from './Model';
import { db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
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

    useEffect(() => {
    localStorage.setItem('dataKey', JSON.stringify(storage));
    }, [storage]);
    const [newQuestion, setNewQuestion] = useState({
        category: "",
        question: "",
    })

    const [lastResult, setlastResult] = useState([]);
    const navigate = useNavigate();


    const id = useId();
    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(data.split(/(\s+)/).filter((e) => e.trim().length > 0));
        let splittedStatement = data.split(/(\s+)/).filter((e) => e.trim().length > 0);
        const tempArr = [];
        splittedStatement.map(item => {
            tempArr.push({
                name: item,
                dropdowns: [],
                category: changeCategory,
            })
        })
        setTestResult(tempArr)
        setIsNew(false)
    };

    console.log(testResult)

    const handleOption = (e) => {
        setPopupVAlue(e.target.name);
        setIsOpen((current) => !current);

    };

    const handleIsOpen = () => {
        setIsOpen(false);
    };

    const handleOnSaveData = (e) => {
        console.log(e, "data from on submit");
    
        testResult.map(item=>{
           if(item.name === popupValue){
            item.dropdowns=[...e]
            setStorage(item);
            console.log(item,"++++++++++++++")
           }
        })
        
        console.log(testResult)
        setDropdownData(e);
        setCreateQuestion(true);
        setDisplay("block")
    };

    const handleChoosenOption = (e) => {
        const arr = [...result]
        const index = arr.indexOf(popupValue);
        if (index !== -1) {
            arr[index] = e;
        }
        setlastResult([...arr])

    }

    const handleSubmittion = () => {

        const citiesRef = collection(db, 'categories');
        addDoc(collection(citiesRef, changeCategory, 'questions'), {
            category: changeCategory,
            question: lastResult.join(' ')
        })
            .then(() => {
                alert("new question added successfully!")
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })



    }

    return (
        <div>
            <Sidebar />
            <div className="App">
                {isNew && <section className='new__statement'>
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
                        <input type="submit" class="btn btn-primary" value="submit" />
                    </form>
                </section>}

                <section className="splited__section">
                    {!isNew && <h2>Choose a word to add a dropdown</h2>}
                    {testResult.length > 0 && testResult.map((item) => (
                        <button type="button" key={item.name} className="splited__questions btn btn-light" name={item.name} onClick={(e) => { handleOption(e); }}>{item.name}</button>
                    ))}
                </section>
                {isOpen && <Model isOpen={handleIsOpen} onSaveData={handleOnSaveData} name={popupValue} />}

                {createQuestion && <DropD keys={popupValue} choosenOption={handleChoosenOption} data={dropdownData} className="top" />}

                <section className="splited__section">
                    {lastResult.length > 0 && lastResult.map((item) => (
                        <button type="button" key={id} className="splited__questions btn btn-light">{item}</button>
                    ))
                    }

                    <button type="submit" style={{ display: display }} className='btn btn-success' id="lname" name="lname" onClick={handleSubmittion}>Submit this statement</button>
                </section>
            </div>
        </div>
    );
}

export default NewQuestion;
