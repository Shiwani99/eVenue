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

let baseURL = "http://localhost:8080/dataa?";
let reactURL = "?";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();
  const [data, setData] = useState(null);


  const age_rangeFilterRef = useRef([]);
  const activityNameFilterRef = useRef([]);
  const costFilterRef = useRef([]);
  const cityFilterRef = useRef([]);
  const stateFilterRef = useRef([]);

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

  function setactivitynameFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      activityNameFilterRef.current = [...activityNameFilterRef.current, value];
    } else {
        activityNameFilterRef.current = activityNameFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("activityName=") !== -1) {
      const st="activityName"+"="+activityNameFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"activityName="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"activityName="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"activityName"+"="+activityNameFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"activityName"+"="+activityNameFilterRef.current;
    }
    navigate(reactURL)
  }

  function setcostFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      costFilterRef.current = [...costFilterRef.current, value];
    } else {
        costFilterRef.current = costFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("cost=") !== -1) {
      const st="cost"+"="+costFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"cost="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"cost="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"cost"+"="+costFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"cost"+"="+costFilterRef.current;
    }
    navigate(reactURL)
  }

  function setcityFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;    
      if (checked) {
        cityFilterRef.current = [...cityFilterRef.current, value];
      } else {
        cityFilterRef.current = cityFilterRef.current.filter((option) => option !== value);
      }      
      if (baseURL.indexOf("city=") !== -1) {
        const st="city"+"="+cityFilterRef.current
        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"city="}[^&]*`),
          st
        );
        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"city="}[^&]*`),
          st
        );       
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {
        // backend URL
        baseURL=baseURL+"&"+"city"+"="+cityFilterRef.current;
        // frontend URL
        reactURL=reactURL+"&"+"city"+"="+cityFilterRef.current;
      }  
    navigate(reactURL)
  }

  function setstateFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;    
      if (checked) {
        stateFilterRef.current = [...stateFilterRef.current, value];
      } else {
        stateFilterRef.current = stateFilterRef.current.filter((option) => option !== value);
      }      
      if (baseURL.indexOf("state=") !== -1) {
        const st="state"+"="+stateFilterRef.current
        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"state="}[^&]*`),
          st
        );
        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"state="}[^&]*`),
          st
        );       
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {
        // backend URL
        baseURL=baseURL+"&"+"state"+"="+stateFilterRef.current;
        // frontend URL
        reactURL=reactURL+"&"+"state"+"="+stateFilterRef.current;
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
  }, [age_rangeFilterRef.current,activityNameFilterRef.current, costFilterRef.current, cityFilterRef.current,stateFilterRef.current, searchTerm]);

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
            <h5 className="search-h4">Filter by Activity type</h5>
            <label class="checkbox-label">
              <input type="checkbox" value="tennis" onChange={(event) => setactivitynameFilters(event)} />
                <span class="checkmark">Tennis</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="badminton" onChange={(event) => setactivitynameFilters(event)} />
                  <span class="checkmark">Badminton</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="football" onChange={(event) => setactivitynameFilters(event)} />
                <span class="checkmark">Football</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="basketball" onChange={(event) => setactivitynameFilters(event)} />
                <span class="checkmark">Basketball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="table tennis" onChange={(event) => setactivitynameFilters(event)} />
                <span class="checkmark">Table Tennis </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="volleyball" onChange={(event) => setactivitynameFilters(event)} />
                <span class="checkmark">Volleyball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="squash" onChange={(event) => setactivitynameFilters(event)} />
                <span class="checkmark">Squash</span> 
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="other" onChange={(event) => setactivitynameFilters(event)} />
                <span class="checkmark">other</span> 
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
              <span class="checkmark">below 18</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="18 and above" onChange={(event) => setagerangeFilters(event)} />
              <span class="checkmark">18 and above </span>
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 className="search-h4">Filter by cost</h5>
            <label class="checkbox-label">
              <input type="checkbox" value="paid" onChange={(event) => setcostFilters(event)} />
              <span class="checkmark">Paid</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="free" onChange={(event) => setcostFilters(event)} />
              <span class="checkmark">Free</span>
            </label>
          </div> 
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 className="search-h4">Filter by City</h5>
          <label class="checkbox-label">
              <input type="checkbox" value="bloomington" onChange={(event) => setcityFilters(event)} />
              <span class="checkmark">Bloomington </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="anderson" onChange={(event) => setcityFilters(event)} />
              <span class="checkmark">Anderson </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="greenwood" onChange={(event) => setcityFilters(event)} />
              <span class="checkmark">Greenwood </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="indianapolis" onChange={(event) => setcityFilters(event)} />
              <span class="checkmark">Indianapolis </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="chicago" onChange={(event) => setcityFilters(event)} />
              <span class="checkmark">Chicago</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="springfield" onChange={(event) => setcityFilters(event)} />
              <span class="checkmark">Springfield</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="champaign" onChange={(event) => setcityFilters(event)} />
              <span class="checkmark">Champaign </span>
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 className="search-h4">Filter by State</h5>
          <label class="checkbox-label">
              <input type="checkbox" value="indiana" onChange={(event) => setstateFilters(event)} />
              <span class="checkmark">Indiana </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="illinois" onChange={(event) => setstateFilters(event)} />
              <span class="checkmark">Illinois </span>
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
              <th>Activity</th>
              <th>city</th>
              <th>state</th>
              <th>cost</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((json) => (
              <tr key={json._id}>
                <td style={{color:'black'}}>{json.name}</td>
                <td style={{color:'black'}}>{json.age_range}</td>
                <td style={{color:'black'}}>{json.city}</td>
                <td style={{color:'black'}}>{json.state}</td>
                <td style={{color:'black'}}>{json.cost}</td>
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