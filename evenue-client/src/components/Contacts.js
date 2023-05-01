import React, { useState, useEffect } from 'react';
import "./Contacts.css"; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import TopNav from "./Navbar";

function Contacts() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="bag">
        <TopNav/>   
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <br></br> 
      <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>
    <div className="contacts-container">
        <h1 style={{fontWeight:'bold',fontSize:'5rem', color:'var(--text-color)'}}>Contact Us</h1>
      <br></br>
      
      <div className="contact-info">
        <div className="emails">
          <h3 style={{ color: '#ffbd59' }}><FontAwesomeIcon icon={faEnvelope} style={{ color: '#ffbd59' }} />Email</h3>
          <h4 style={{ color: 'var(--text-color)', textAlign:'center' }}>evenue@gmail.com</h4>
          <br></br>
          <h3 style={{ color: '#ffbd59' }}><FontAwesomeIcon icon={faPhone} style={{ color: '#ffbd59' }}/>Phone</h3>
          <h4 style={{ color: 'var(--text-color)', textAlign:'center' }}>(812) 671-5178</h4>
          <br></br>
          <h3 style={{ color: '#ffbd59' }}><FontAwesomeIcon icon={faMapMarker} style={{ color: '#ffbd59' }}/>Address</h3>
            <h4 style={{ color: 'var(--text-color)', textAlign:'center' }}>Luddy Hall
                700 N. Woodlawn Avenue<br></br>
                Bloomington, IN 47408</h4>
        </div>
      </div>
    </div> 
    </div>
    </div>   
  );
}

export default Contacts;

