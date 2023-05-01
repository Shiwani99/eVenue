import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ForgotPassword.css';
import TopNav from './Navbar';
import axios from 'axios';



function ForgotPassword() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


    const [email, setEmail] = useState('');

    function handleSubmit(){
      
        axios.post('https://evenues.herokuapp.com/forgot password',{"email":email})
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.error(error);
              });
     
    
    }
    
    return (
      <div className='bag-forgot'>
      <TopNav />
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            
            <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>
      <div className='forgot-password' style={{height:'100vh'}}>
      <form onSubmit={handleSubmit} className="container-forgot">
        <label style={{color:'var(--text-color)'}}>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value) } placeholder="Enter Email" required
          />
        </label>
        <br></br>
        <br></br>
        <button className='btn-forgot' type="submit">Reset Password</button>
      </form>
      </div>
    </div>
  </div>
    );
}
export default ForgotPassword;


  
