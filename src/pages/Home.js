import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className='landing__page'>
      <nav className='top_nav'>
        <Link to='/'><img src='https://media.licdn.com/dms/image/C560BAQGghHrBNT18Ww/company-logo_200_200/0/1524310864696?e=1684368000&v=beta&t=aD2xtdD4R2yH2bQrd8RRkveyW98oUzJzy7c0Ien2y-c' alt='logo' /></Link>

        <div className='landing_title'>
          <p>Clinical Trial generator</p>
        </div>
      </nav>
      <div className='choice_container'>
        <div className='choice'>
          <Link to='/clinicaltrials' className="choice__link">Clinical Trials</Link>
          <Link to='/regulatoryafairs' className="choice__link">Regulatory Afairs</Link>
          <Link to='/pharmacovigilance' className="choice__link">Pharmacovigilance</Link>
        </div>
      </div>

    </section>
  )
}

export default Home;