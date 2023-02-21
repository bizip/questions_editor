import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { Dna } from  'react-loader-spinner'
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

        <div className={styles.main}>
            <div className='statement_nav'>
                <h1>Statement List</h1>
            </div>
            {data.length < 1 ? <div className={styles.loader}>
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />

            </div> : <section>
                <form onSubmit={handleFormSubmit}>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Questions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data.length > 0) && (data.map((Item, index) => (
                                <tr key={Item.id}>
                                    <td>{index + 1}</td>
                                    <td>{Item.question}</td>
                                    <td>
                                        <Link to={`answer/${Item.id}`} className="btn btn-link text-decoration-none">Find answer</Link>
                                        <Link to='/edit' state={{ statement: Item.question, category: choseCategory, id: Item.id, dropdowns: Item.dropdown }} className="btn btn-link text-decoration-none" variant='primary'>Edit</Link>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </Table>
                </form>
            </section>
            }
        </div>
    );
}
export default Main;







