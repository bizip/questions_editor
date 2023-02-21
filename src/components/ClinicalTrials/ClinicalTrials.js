import React from 'react'
import { Link } from 'react-router-dom';
import img from '../../img/trial1.svg';
import Footer from '../footer/Footer';

const ClinicalTrials = () => {
    return (
        <section className='landing__page'>
            <nav className='top_nav'>
                <Link to='/'><img src='https://media.licdn.com/dms/image/C560BAQGghHrBNT18Ww/company-logo_200_200/0/1524310864696?e=1684368000&v=beta&t=aD2xtdD4R2yH2bQrd8RRkveyW98oUzJzy7c0Ien2y-c' alt='logo' /></Link>
                <div className='landing_title'>
                    <p>Clinical Trials</p>
                </div>
            </nav>
           


            <div className='choice_container'>
            <div className='landing_image'>
              <img src={img} alt='medecine' />
            </div>
            <div className='choice_card'>
            <div className='choice'>
            <Link to='/clinicaltrials/clinicaltrialstudyprotocal' className="choice__link">Clinical trial Study Protocol</Link>
            <Link to='/clinicaltrials/statudystartup' className="choice__link" style={{pointerEvents: 'none'}}>Study Start-Up</Link>
            <Link to='/clinicaltrials/clinicaltrialapplication' className="choice__link" style={{pointerEvents: 'none'}}>Clinical Trial Application</Link>
        </div>
            </div>
            </div>
            <Footer />
        </section>
    )
}

export default ClinicalTrials;