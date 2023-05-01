import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNav from './Navbar';
import { useLocation } from 'react-router-dom';

function Participants(){

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  const locations = useLocation();
  const eventId = new URLSearchParams(locations.search).get('eid');
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get("https://evenues.herokuapp.com/get_participants",{
      params: {
        "eid":eventId
      }
    })
    .then(response => {
      console.log(response.data)
      setData(response.data)
    })
    .catch(error => {
      console.error(error);
    })
  },[])

  return(
    <div className='bgs'>
      <TopNav />
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            
            <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>
                
      <h1 style={{color:"var(--text-color)", height:"100vh"}}>Participants for the event</h1>
      {data && data.map((element, index) => (
          <ul>
            <li style={{color:"var(--text-color)"}} key={index}>{element}</li>
          </ul>
        ))}
    </div>
    </div>

  );
}

export default Participants;

