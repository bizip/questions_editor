import React from 'react'
import ChooseOption from '../components/dropdowns/ChooseOption';
import NewQuestion from '../components/NewQuestion';
import Sidebar from '../components/Sidebar';
import styles from "./Home.module.css";

const AddDropdowns = () => {
  return (
    <section className={styles.home_container}>
      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.main_section}><ChooseOption /></div>
    </section>
  )
}

export default AddDropdowns;