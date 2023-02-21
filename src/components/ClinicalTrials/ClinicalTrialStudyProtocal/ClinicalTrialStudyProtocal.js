import React from 'react'
import styles from '../../../pages/Home.module.css'
import Sidebar from '../../Sidebar';
import Main from "../../Main"

const ClinicalTrialStudyProtocal = () => {
  return (
    <section className={styles.home_container}>
    <div className={styles.sidebar}><Sidebar /></div>
    <div className={styles.main_section}><Main /></div>
  </section>
  )
}

export default ClinicalTrialStudyProtocal;