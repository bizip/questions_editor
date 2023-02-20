import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className='landing__page'>
      <div className='choice'>
        <Link to='/clinicaltrials' className="choice__link">Clinical Trials</Link>
        <Link to='/regulatoryafairs' className="choice__link">Regulatory Afairs</Link>
        <Link to='/pharmacovigilance' className="choice__link">Pharmacov Igilance</Link>
      </div>
    </section>
  )
}

export default Home;