import { useState, useId, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import classes from './NewStatement.module.css';
import styles from '../pages/Home.module.css';

function NewQuestion() {
    const [data, setData] = useState({});
    const [result, setResult] = useState([]);
    const [testResult, setTestResult] = useState([]);
    const [isNew, setIsNew] = useState(true);
    const [changeCategory, setChangeCategory] = useState("");
    const [storage, setStorage] = useState([]);
    const [statement, setSatatement] = useState([]);
    const [questionData, setQuestionData] = useState([]);
    const [previousOptions, setpreviousOptions] = useState([]);
    const [clickedIndex, setClickedIndex] = useState([]);
    useEffect(() => {
        localStorage.setItem('dataKey', JSON.stringify(storage));
    }, [storage]);


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

    return (
        <div>
            <div>
                <section className='new__statement'>
                    <div className='statement_nav'>
                    <h1>Create A new Statement</h1>
                </div>
                    <form onSubmit={handleSubmit}>
                        <label className={classes.label}>
                            <select onChange={(e) => {
                                setChangeCategory(e.target.value);
                            }} className="dropdowns">
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
