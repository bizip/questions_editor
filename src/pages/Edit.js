import React from 'react'
import EditStatement from '../components/EditStatement';
import Sidebar from '../components/Sidebar';
import styles from "./Home.module.css";

const Edit = () => {
  return (
    <section className={styles.home_container}>
      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.main_section}><EditStatement /></div>
    </section>
  )
}

export default Edit;