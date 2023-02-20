import React from 'react'
import { Link } from 'react-router-dom';

const ClinicalTrials = () => {
  return (
    <section className='clinicaltrials__page'>
    welcome to clinical trials
    <div className='choice'>
      <Link to='/clinicaltrials/clinicaltrialstudyprotocal' className="choice__link">Clinicaltrial Study Protocal</Link>
      <Link to='/clinicaltrials/statudystartup' className="choice__link">Statudy Start Up</Link>
      <Link to='/clinicaltrials/clinicaltrialapplication' className="choice__link">Clinical Trial Application</Link>
    </div>
  </section>
  )
}

export default ClinicalTrials;