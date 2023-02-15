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
        <p>Statement Editor</p>
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
