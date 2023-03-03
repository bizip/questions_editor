import React from 'react'
import { useParams } from 'react-router-dom';
import styles from '../pages/Home.module.css';
import Sidebar from './Sidebar'

const Details = () => {
    let { id } = useParams();
    console.log(id,"this is the Id");
  return (
    <section className={styles.home_container}>
    <div className={styles.sidebar}><Sidebar /></div>
    <div className={styles.main_section}></div>
  </section>
  )
}

export default Details;