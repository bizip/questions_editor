import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from '../pages/Home.module.css';
import Sidebar from './Sidebar'

const Details = () => {
    const [list, setList] = useState([])
    const location = useLocation();
    const { data } = location.state;
    let { id } = useParams();

    return (
        <section className={styles.home_container}>
            <div className={styles.sidebar}><Sidebar /></div>
            <div className={styles.main_section}>
            <section dangerouslySetInnerHTML={{ __html: data.text }} className="ans">
            </section>
      
            </div>
        </section>
    )
}

export default Details;