import React from 'react'
import Answer from '../components/Answer';
import Sidebar from '../components/Sidebar';
import styles from "./Home.module.css";

const FindSlution = () => {
  return (
    <section className={styles.home_container}>
      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.main_section}><Answer /></div>
    </section>
  )
}

export default FindSlution;