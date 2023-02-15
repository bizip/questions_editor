import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
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
        const querySnapshot = await getDocs(collection(db, `categories/${choseCategory}/questions`));
        querySnapshot.forEach((doc) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() })
            })
            setData(tempDoc);
        });
    };
    useEffect(() => {
        if (choseCategory !== "") {
            handleSyncData();
        }
    }, [choseCategory]);
    const handleChange = (e) => {
        setChooseCategory(e.target.value)
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Select a category:
                    <select value={choseCategory} onChange={(e) => {
                        handleChange(e)
                    }}>
                        <option value="">Select a category</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="sports">Sports</option>
                    </select>
                </label>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Category name</th>
                            <th>Questions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.length > 0) && (data.map((Item, index) => (
                            <tr key={Item.id}>
                                <td>{index + 1}</td>
                                <td>{Item.category}
                                </td>
                                <td>{Item.question}</td>
                                <td>
                                    <Link to={`answer/${Item.id}`} variant='primary'>Find answer</Link>
                                    <Link to='/edit' state={{ statement: Item.question, category: choseCategory, id: Item.id, dropdowns: Item.dropdown }} class="btn btn-primary" variant='primary'>Edit</Link>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </Table>
            </form>
        </div>
    );
}
export default Main;







