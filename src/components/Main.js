import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { Puff } from 'react-loader-spinner'
import styles from "./Main.module.css";

function Main() {
    const [choseCategory, setChooseCategory] = useState('');
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    const handleSyncData = async () => {
        const querySnapshot = await getDocs(collection(db, `categories/health/questions`));
        querySnapshot.forEach((doc) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() })
            })
            setData(tempDoc);
        });
    };

    const fetchDatafromStorage = () => {
        const savedList = localStorage.getItem('myList');
        if (savedList) {
            setList(JSON.parse(savedList));
        }
    }
    useEffect(() => {
        handleSyncData();
    }, []);

    useEffect(() => {
        fetchDatafromStorage();
    }, [])
    console.log(list, "This is the list")
    return (
        <section>
            <div className='statement_nav'>
                <h2>My Previous Documents</h2>
            </div>
            <div className={styles.sect_container}>
                <div className={styles.newDoc}>
                    {(data.length > 0) && (data.map((Item) => (
                        <Link to='/edit' state={{ statement: Item.question, category: choseCategory, id: Item.id, dropdowns: Item.dropdown }} className="btn btn-link text-decoration-none" variant='primary'>New Document</Link>
                    )))}
                    <Link to='/options' variant='primary'>Clear All documents</Link>

                </div>
                <div className={styles.doCcontainer}>
                    {list.length > 0? list.map(result=>(
                        <div className={styles.doc} key={result.id}>
                        <div dangerouslySetInnerHTML={{ __html: result.title }} ></div>
                        <p>{result.summary}
                        </p>
                        <div className={styles.docfooter}>
                            <Link to='/options' className='link-success'>view more</Link>
                            <Link to='/options' className='link-danger'>Delete</Link>
                        </div>
                        </div>
                    )) :
                    <div>
                    <h3>There is no document in the list</h3>
                    {(data.length > 0) && (data.map((Item) => (
                        <Link to='/edit' state={{ statement: Item.question, category: choseCategory, id: Item.id, dropdowns: Item.dropdown }} className="btn btn-link text-decoration-none" variant='primary'>Generate New Document</Link>
                    )))}
                    </div>
                 }
                </div>
            </div>
        </section>
    );
}
export default Main;







