import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import {useNavigate, useLocation} from 'react-router-dom';
import './TwoFA.css';
import TopNav from './Navbar';

function TwoFA(){

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

    const [code,setCode] = useState("");
    const navigate=useNavigate();
    const locations = useLocation();
    const usertype = new URLSearchParams(locations.search).get('usertype');

    function verifyCode() {
        fetch('https://evenues.herokuapp.com/verify_code', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              code: code // replace with the user's phone number
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.message);
            
            if(data.message=="Authenticated Successfully"){
                alert("Authenticated Successfully!!!");
                if(usertype=='1')
                  navigate("/")
                else
                  navigate("/Voview")
            }
            else if (data.message=="Authentication not successful"){
                alert("Authentication not successful");
            }
          })
          .catch(error => {
            console.log(error);
          });

        

    }

    function handleCode(event){
        setCode(event.target.value);
    }

    return(

      <div className="bag-2fa" > 
      <TopNav/>
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{backgroundColor: 'var(--background-color)',  color: 'var(--text-color)'}}>
       <br></br> 
       <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>
        <div style={{height:'100vh'}}>
          <div className='container-2fa' >
            <p >Enter the code:</p>
            <input type="text" value={code} onChange={(event)=>handleCode(event)}/>
            <br></br>
            <button className='btn-2fa' onClick={()=>verifyCode()}>Verify</button>
            </div>
            </div>
          </div>
        </div>


    );

}

export default TwoFA;
