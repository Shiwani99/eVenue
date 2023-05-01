import React, { useState, useEffect } from 'react';
import './Aboutus.css'; // Import the CSS file
import TopNav from './Navbar';
import Nikita from './Nikita.jpg';
import Jitesh from './Jitesh.jpg';
import Shiwani from './Shiwani.jpg';
import Diego from './Diego.jpg';
import Kavya from './Kavya.jpg';

function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className='bag-about'>
        <TopNav/>
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <br></br>
    <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>
    <div className="aboutus-container">
        <br></br>
      <h1 style={{fontWeight:'bold',fontSize:'5rem',color: 'var(--text-color)'}}>About Us</h1>
      <div style={{ color: 'var(--text-color)' }} className="aboutus-content">        
        <p style={{ color: 'var(--text-color' }}>One-stop-solution for event bookers and the venue owners!!</p>
        <p style={{ color: 'var(--text-color' }}>Helps connect the venue owners with the customers!!</p>
        <p style={{ color: 'var(--text-color' }}>We make it easy to find, book and list your venue.</p>
        <p style={{ color: 'var(--text-color' }}>With smooth connections between a participant and organizer</p>
        <p style={{ color: 'var(--text-color' }}>We make the entire process hassle free for you.</p>       
      </div>
      <br></br>
      <h2 style={{fontWeight:'bold',fontSize:'3rem',color: 'var(--text-color)'}}>Our Team</h2>
      <br></br>
      <div className="team-container">
        <div className="team-member">
          <img src={Shiwani} alt="Shiwani Rajagopalan" />
          <h3 style={{ color: 'var(--text-color' }}>Shiwani Rajagopalan</h3>
        </div>
        <div className="team-member">
          <img src={Kavya} alt="Kavya Sri Kasarla" />
          <h3 style={{ color: 'var(--text-color' }}>Kavya Sri Kasarla</h3>
        </div>
        <div className="team-member">
          <img src={Nikita} alt="Nikita Parag Potdar" />
          <h3 style={{ color: 'var(--text-color' }}>Nikita Parag Potdar</h3>
        </div>
        <div className="team-member">
          <img src={Jitesh} alt="Jitesh Bhandari" />
          <h3 style={{ color: 'var(--text-color' }}>Jitesh Bhandari</h3>
        </div>
        <div className="team-member">
          <img src={Diego} alt="Diego Souza Gomes da Cruz Costa" />
          <h3 style={{ color: 'var(--text-color' }}>Diego Souza Gomes da Cruz Costa</h3>
        </div>
       </div>
    </div>
    </div>
    </div>
  );
}

export default About;
