import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [currentLink, setCurrentLink] = useState(0);

  const handleClick = (index) => {
    setCurrentLink(index);
  }

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/" className={currentLink === 0 ? 'active' : ''}
                 onClick={() => handleClick(0)}>Asked Questions</Link></li>
          <li><Link to="/new" className={currentLink === 1 ? 'active' : ''} 
                  onClick={() => handleClick(1)}>Ask Questions</Link></li>
        </ul>
      </nav>
    </div>
  ); 
}

export default Sidebar;
