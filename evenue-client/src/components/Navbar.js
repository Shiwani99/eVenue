import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

function TopNav(props) {

  const navigate=useNavigate();
  const [user, setUser] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  /*
  axios(
    {
      method: "GET", 
      url: '/profile'
    }).then((response) => {
      const res = response.data
      if (res.session_email !== "") 
      {
        setUser(res.session_email);
        setLoggedin(true)
      } 
    console.log(user) }) 
    .catch ((err) => { console.log(err.response) })
    */

    fetch('https://evenues.herokuapp.com/profile', {
      method: 'GET',
      mode: 'cors', // sets the mode of the request to CORS
      credentials: 'include', // includes credentials like cookies in the request
      headers: {
        'Content-Type': 'application/json', // sets the Content-Type header to JSON
      },
    })
    .then(response => response.json())
    .then(data => {
      const { session_email } = data;
      if (session_email !== "") {
        setUser(session_email);
        setLoggedin(true);
      }
      console.log(user);
    })
    .catch(error => {
      console.error(error);
    });
    


  const brandname = 'evenue'
  if (brandname in props) {
    const brandname = props.brandname
  }

  return (
    <Navbar collapseOnSelect className='mx-auto px-5' expand="lg" sticky="top" style={{height: "50", fontFamily: 'Montserrat', fontWeight: 500, backgroundColor: '#ffbd59'}} >
        <Navbar.Brand href='/'>{brandname}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features"style={{fontSize: '22px'}}>Arts and Theater</Nav.Link>
            <Nav.Link href="#pricing" style={{fontSize: '22px'}}>Movies</Nav.Link> */}
          </Nav>
          <Nav>
          <Nav.Link href="/About" style={{fontSize: '22px'}}>Aboutus</Nav.Link>
            <Nav.Link href="/Contacts" style={{fontSize: '22px'}}>Contacts</Nav.Link>
            <Nav.Link href="/Search" style={{fontSize: '22px'}}>Search</Nav.Link>
            {loggedin && (<Nav.Link onClick={() => navigate("/organize_event")} style={{fontSize: '22px'}}>Organize</Nav.Link>) } 
            {loggedin && (<Nav.Link href="/calendar" style={{fontSize: '22px'}}>Calendar</Nav.Link>)}
            {loggedin ? (<Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/chat')}>Chat
            </Nav.Link>):(
            <Nav.Link></Nav.Link>
            )}

            { loggedin ? (<Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/Profile')}>
              Profile
            </Nav.Link>) : (<Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/Login')}>
              Login/Signup
            </Nav.Link>) }

            {loggedin && (
              <Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/logout')}>
              Logout
            </Nav.Link>
            )}
            
  
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav;
