import React, { useState } from 'react';
import TopNav from './Navbar';
import './InviteFriends.css';

function InviteFriends() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInviteClick = () => {
    window.open(`mailto:${email}?subject=Join me on my awesome app!&body=Hey! I'd like to invite you to join me on my awesome app. Click the link to sign up: https://localhost:3000/signup`);
    setEmail('');
  };

  return (
    <div className='bag-invite'>
      <TopNav/>
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    <br></br>
    <button className='btn-theme' onClick={toggleTheme}>Toggle Theme</button>    
    <br></br>
    <h2 style={{fontWeight:'bold',fontSize:'5rem',color: 'var(--text-color)'}}>Invite Friends</h2>
    <div className='invite-friends'>      
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter email address" />
      <br></br>
      <button className='btn-invite' onClick={handleInviteClick}>Invite</button>
    </div>
    <div style={{backgroundColor:'var(--background-color)',color:'var(--text-color)'}} className='invite'>      
    </div>
    </div>
  </div>
  );
}

export default InviteFriends;
