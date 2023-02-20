import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../pages/Home.module.css";

function Sidebar() {
  const [currentLink, setCurrentLink] = useState(0);

  const handleClick = (index) => {
    setCurrentLink(index);
  }

  return (
    <div className={styles.sidebar_content}>

      <div className={styles.sidebar_header_container}>
      <img src='https://media.licdn.com/dms/image/C560BAQGghHrBNT18Ww/company-logo_200_200/0/1524310864696?e=1684368000&v=beta&t=aD2xtdD4R2yH2bQrd8RRkveyW98oUzJzy7c0Ien2y-c' alt='logo' />
      </div>
      <nav>
        <ul>
          <li><Link to="/" className={currentLink === 0 ? 'active' : ''}
            onClick={() => handleClick(0)}>Asked Questions</Link></li>
          <li><Link to="/new" className={currentLink === 1 ? 'active' : ''}
            onClick={() => handleClick(1)}>Ask Questions</Link></li>
        </ul>
      </nav>
    </div >
  );
}

export default Sidebar;
