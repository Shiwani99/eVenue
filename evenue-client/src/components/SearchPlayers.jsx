import "./SearchPage.css";
import React, { useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import TopNav from "./Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from 'react-bootstrap/Spinner';
//import Sidebar from "./Sidebar";

let baseURL = "http://localhost:8080/datap?";
let reactURL = "?";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();
  const [data, setData] = useState(null);


  const age_rangeFilterRef = useRef([]);
  const interestFilterRef = useRef([]);
  const genderFilterRef = useRef([]);
  const skill_levelFilterRef = useRef([]);

  function setSearchTerms(value){
    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value
        // update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );
        // update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );
        baseURL=updatedBaseURL
        reactURL=updatedReactURL
        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        reactURL=reactURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }
      navigate(reactURL)      
  }

  function setagerangeFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;    
      if (checked) {
        age_rangeFilterRef.current = [...age_rangeFilterRef.current, value];
      } else {
        age_rangeFilterRef.current = age_rangeFilterRef.current.filter((option) => option !== value);
      }      
      if (baseURL.indexOf("age_range=") !== -1) {
        const st="age_range"+"="+age_rangeFilterRef.current
        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"age_range="}[^&]*`),
          st
        );
        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"age_range="}[^&]*`),
          st
        );      
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL
      } else {
        // backend URL
        baseURL=baseURL+"&"+"age_range"+"="+age_rangeFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"age_range"+"="+age_rangeFilterRef.current;
      }  
    navigate(reactURL)
  }

  function setinterestFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      interestFilterRef.current = [...interestFilterRef.current, value];
    } else {
        interestFilterRef.current = interestFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("interest=") !== -1) {
      const st="interest"+"="+interestFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"interest="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"interest="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"interest"+"="+interestFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"interest"+"="+interestFilterRef.current;
    }
    navigate(reactURL)
  }

  function setgenderFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      genderFilterRef.current = [...genderFilterRef.current, value];
    } else {
        genderFilterRef.current = genderFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("gender=") !== -1) {
      const st="gender"+"="+genderFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"gender="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"gender="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"gender"+"="+genderFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"gender"+"="+genderFilterRef.current;
    }
    navigate(reactURL)
  }

  function setskilllevelFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;    
      if (checked) {
        skill_levelFilterRef.current = [...skill_levelFilterRef.current, value];
      } else {
        skill_levelFilterRef.current = skill_levelFilterRef.current.filter((option) => option !== value);
      }      
      if (baseURL.indexOf("skill_level=") !== -1) {
        const st="skill_level"+"="+skill_levelFilterRef.current
        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"skill_level="}[^&]*`),
          st
        );
        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"skill_level="}[^&]*`),
          st
        );       
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {
        // backend URL
        baseURL=baseURL+"&"+"skill_level"+"="+skill_levelFilterRef.current;
        // frontend URL
        reactURL=reactURL+"&"+"skill_level"+"="+skill_levelFilterRef.current;
      }  
    navigate(reactURL)
  }


  const [sidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  

  useEffect(() => {
    axios.get(baseURL)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.data;
        } else {
          throw new Error("Server responded with an error status: " + res.status);
        }
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(handleError);
  }, [age_rangeFilterRef.current,interestFilterRef.current, genderFilterRef.current, skill_levelFilterRef.current,searchTerm]);

  function handleError(error) {
    console.error("Axios error:", error);
    // handle the error here, e.g. show an error message to the user
  }

  if (!data) return <div>Loading...</div>;

  return (
  <div className="bag">
      <TopNav/>
      
    <div>
      <Row>
      <div className="searchbox">        
        <input 
          //style={{backgroundColor: 'white', width: '100%', height: '50px'}}
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerms(event.target.value)}
        />
        <div>
          <button onClick={toggleSidebar} className='btn-search' >Filters</button>
        </div>        
      </div>  
      </Row>
      <Row>
      <Col className="col-md-2">
      <div className="sidebar-container">
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>   
          <div class="checkbox-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 className="search-h4">Filter by Interested Activity</h5>
            <label class="checkbox-label">
              <input type="checkbox" value="tennis" onChange={(event) => setinterestFilters(event)} />
                <span class="checkmark">Tennis</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="badminton" onChange={(event) => setinterestFilters(event)} />
                  <span class="checkmark">Badminton</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="football" onChange={(event) => setinterestFilters(event)} />
                <span class="checkmark">Football</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="basketball" onChange={(event) => setinterestFilters(event)} />
                <span class="checkmark">Basketball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="table tennis" onChange={(event) => setinterestFilters(event)} />
                <span class="checkmark">Table Tennis </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="volleyball" onChange={(event) => setinterestFilters(event)} />
                <span class="checkmark">Volleyball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="squash" onChange={(event) => setinterestFilters(event)} />
                <span class="checkmark">Squash</span> 
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 className="search-h4">Filter by Age Range</h5>
            <label class="checkbox-label">
              <input type="checkbox" value="all" onChange={(event) => setagerangeFilters(event)} />
              <span class="checkmark">all </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="below 18" onChange={(event) => setagerangeFilters(event)} />
              <span class="checkmark">below 18 </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="18 and above" onChange={(event) => setagerangeFilters(event)} />
              <span class="checkmark">18 and above </span>
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 className="search-h4">Filter by Gender</h5>
            <label class="checkbox-label">
              <input type="checkbox" value="male" onChange={(event) => setgenderFilters(event)} />
              <span class="checkmark">Male</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="female" onChange={(event) => setgenderFilters(event)} />
              <span class="checkmark">Female</span>
            </label>
          </div> 
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 className="search-h4">Filter by Skill Level</h5>
            <label class="checkbox-label">
              <input type="checkbox" value="beginner" onChange={(event) => setskilllevelFilters(event)} />
              <span class="checkmark">Beginner</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="intermediate" onChange={(event) => setskilllevelFilters(event)} />
              <span class="checkmark">Intermediate</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="expert" onChange={(event) => setskilllevelFilters(event)} />
              <span class="checkmark">Expert</span>
            </label>
          </div>        
        </div>        
      </div>
      </Col>
    <Col classname="col-md-8">
    <div className="filter-container">
      <h2 style={{color:'white'}}>Results</h2>
        <Table striped="columns">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age Range</th>
              <th>Interested Activity</th>
              <th>Skill Level</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((json) => (
              <tr key={json._id}>
                <td style={{color:'black'}}>{json.email}</td>
                <td style={{color:'black'}}>{json.age}</td>
                <td style={{color:'black'}}>{json.sports}</td>
                <td style={{color:'black'}}>{json.skill_level}</td>
                <td style={{color:'black'}}>{json.gender}</td>
              </tr>
              ))) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </tbody>      
        </Table>
    </div>
    </Col>
    <Col className="col-md-2"></Col>
    </Row>
    </div>
  </div>
  );
}

export default App;