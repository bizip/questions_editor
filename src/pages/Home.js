import React from 'react'
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.home_container}>
      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.main_section}><Main /></div>
    </section>
  )
}

export default Home;