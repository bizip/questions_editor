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
    useEffect(() => {
        handleSyncData();
    }, []);

    return (
        <section>
            <div className='statement_nav'>
                <h2>My Previous Documents</h2>
            </div>
            <div className={styles.sect_container}>
                <div className={styles.newDoc}>
                    <Link to='/options' variant='primary'>New Document</Link>
                    <Link to='/options' variant='primary'>Clear All documents</Link>
                </div>
                <div className={styles.doCcontainer}>
                    <div className={styles.doc}>
                        <h2>Hi this is doc title</h2>
                        <p>Write a clinical trial study protocol for a phase randomization blinding controls trial using intervention-name.
                            With patient-count patients. Data is collected data-collection-interval via patient-asessment-method.
                            Minimum age is minimum-age. Maximum age is maximum-age.
                        </p>
                        <div className={styles.docfooter}>
                        <Link to='/options' className='link-success'>view more</Link>
                        <Link to='/options' className='link-danger'>Delete</Link>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Main;







