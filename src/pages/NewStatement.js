import React from 'react'
import Main from '../components/Main';
import NewQuestion from '../components/NewQuestion';
import Sidebar from '../components/Sidebar';
import styles from "./Home.module.css";

const NewStatement = () => {
  return (
    <section className={styles.home_container}>
      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.main_section}><NewQuestion /></div>
    </section>
  )
}

export default NewStatement;