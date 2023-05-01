import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import TopNav from './Navbar';
import "./OrganizeEvent.css"; 
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function OrganizeEvent(){

    const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


    const [eventName,setEventName]=useState("");
    const [description,setDescription]=useState("");
    const [address,setAddress]=useState("");
    //const [location,setLocation]=useState("");
    const [city,setCity]=useState("");
    const [state,setState]=useState("");
    const [date,setDate]=useState(new Date());
    const [starttime,setStartTime]=useState('09:00 AM');
    const [endtime,setEndTime]=useState('06:00 PM');
    const [capacity,setCapacity]=useState("");
    const [ageRange,setAgeRange]=useState("");
    const [cost,setCost]=useState("");
    const [eventType,setEventType]=useState("");
    const [image,setImage]=useState("");
    const [data,setData]=useState("");
    const [jsonData, setJsonData] = useState({});
    const locations = useLocation();
    const editId = new URLSearchParams(locations.search).get('edit');
    const userId = new URLSearchParams(locations.search).get('userid');
    const [showAlert, setShowAlert] = useState(false);
    const [showSaveAlert, setSaveShowAlert] = useState(false);
    const [profileData, setProfileData] = useState({});


    console.log(editId);
    console.log(userId);
    
    const URL="https://evenuee.herokuapp.com/organize_event"

    useEffect(()=>{
        /*
        axios.get("/profile")
        .then(response => {
            setProfileData(response.data["user_details"]);
            console.log(response.data["user_details"]);
        })
        .catch(error => {
            console.log(error);
            })
        */

            fetch('https://evenues.herokuapp.com/profile', {
                method: 'GET', // sets the HTTP method to GET
                mode: 'cors', // sets the mode of the request to CORS
                credentials: 'include', // includes credentials like cookies in the request
                headers: {
                  'Content-Type': 'application/json' // sets the Content-Type header to JSON
                }
              })
              .then(response => response.json())
              .then(data => {
                setProfileData(data.user_details);
                console.log(data.user_details);
              })
              .catch(error => {
                console.error(error);
              });

    },[URL])

   


    function handleName(event){
        setEventName(event.target.value);
        setJsonData({
            ...jsonData,
            "name": event.target.value
          });
    }

    function handleDescription(event){
        setDescription(event.target.value);
        setJsonData({
            ...jsonData,
            "description": event.target.value
          });
    }

    function handleAddress(event){
        setAddress(event.target.value);
        setJsonData({
            ...jsonData,
            "address": event.target.value
          });
    }

    function handleCity(event){
        setCity(event.target.value);
        setJsonData({
            ...jsonData,
            "city": event.target.value
          });
    }

    function handleState(event){
        setState(event.target.value);
        setJsonData({
            ...jsonData,
            "state": event.target.value
          });
    }

    function handleDate(date){
        setDate(date);
        setJsonData({
            ...jsonData,
            "date": date
          });
    }

    function handleStartTime(time){
        setStartTime(time);
        setJsonData({
            ...jsonData,
            "start_time": time
          });
    }

    function handleEndTime(time){
        setEndTime(time);
        setJsonData({
            ...jsonData,
            "end_time": time
          });
    }

    function handleCapacity(event){
        setCapacity(event.target.value);
        setJsonData({
            ...jsonData,
            "capacity": event.target.value
          });
    }

    function handleAgeRange(event){
        setAgeRange(event.target.value);
        setJsonData({
            ...jsonData,
            "age": event.target.value
          });
    }

    function handleCost(event){
        setCost(event.target.value);
        setJsonData({
            ...jsonData,
            "cost": event.target.value
          });
    }

    function handleEventType(event){
        setEventType(event.target.value);
        setJsonData({
            ...jsonData,
            "event_type": event.target.value
          });
    }
    
    function handleImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result;
          setImage(dataUrl);
          setJsonData({
            ...jsonData,
            "image": dataUrl
          });
        };
        reader.readAsDataURL(file);

      }

    function handleSubmit(){
        /*
        axios.post('/create_events', {
            "name":eventName,
            "event_type":eventType,
            "description":description,
            "age_range":ageRange,
            "address":address,
            "city":city,
            "state":state,
            "date":date,
            "start_time":starttime,
            "end_time":endtime,
            "capacity":capacity,
            "cost":cost,
            "organizer": profileData["email"]
        })
         .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            });
        */

            fetch('https://evenues.herokuapp.com/create_events', {
                method: 'POST', // sets the HTTP method to POST
                mode: 'cors', // sets the mode of the request to CORS
                credentials: 'include', // includes credentials like cookies in the request
                headers: {
                  'Content-Type': 'application/json' // sets the Content-Type header to JSON
                },
                body: JSON.stringify({
                  "name":eventName,
                  "event_type":eventType,
                  "description":description,
                  "age_range":ageRange,
                  "address":address,
                  "city":city,
                  "state":state,
                  "date":date,
                  "start_time":starttime,
                  "end_time":endtime,
                  "capacity":capacity,
                  "cost":cost,
                  "image":image,
                  "organizer": profileData["email"]
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log(data);
              })
              .catch(error => {
                console.error(error);
              });
              
        
        setShowAlert(true);
    }

    useEffect(()=>{
    if(editId!=null){
            /*
            axios.get('/get_event_details',{
                params: {
                    _id: userId,
                    e_id: editId
                }
            })
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                })
                */
                
                axios.get('https://evenues.herokuapp.com/get_event_details',{
                params: {
                    _id: userId,
                    e_id: editId
                },
                withCredentials: true, // sets the credentials to include in the request
                headers: {
                    'Content-Type': 'application/json' // sets the content-type header
                },
                mode: 'cors', // sets the mode to cors
                })
                .then(response => {
                setData(response.data);
                console.log(response.data);
                })
                .catch(error => {
                console.log(error);
                });

        
        
        setJsonData({
                ...jsonData,
                "_id": userId
        });
        
        setJsonData({
            ...jsonData,
            "e_id": editId
    });
        
    }
},[userId,editId]);

    function handleSaveEdit(){
        /*
        axios.post('update_event_details',jsonData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            });
            */

        //editId="";

        fetch('https://evenues.herokuapp.com/update_event_details', {
            method: 'POST',
            mode: 'cors', // sets the mode to cors
            credentials: 'include', // sets the credentials to include in the request
            headers: {
              'Content-Type': 'application/json' // sets the content-type header
            },
            body: JSON.stringify(jsonData) // serializes the data to JSON format
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
          
        
        setSaveShowAlert(true);
    }

    


    return(


        <div className="bgs" >
                <div style={{ alignSelf: 'center', alignContent:'center'}}>
                <TopNav />
                <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            
            <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>
                
                    <div className='organize-event' style={{ position: 'relative', top: '30px', right: '400px' }}>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Name of the event:</b>
                            <input type="text" 
                            defaultValue={data["name"] || eventName} onChange={(event) => handleName(event)}/>
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Event Type:</b>
                                <select id="dropdown" style={{marginLeft:'90px',width:'300px'}} defaultValue={data["event_type"] || eventType} onChange={handleEventType}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="tennis">tennis</option>
                                    <option value="badminton">badminton</option>
                                    <option value="football">football</option>
                                    <option value="basketball">basketball</option>
                                    <option value="table tennis">table tennis</option>
                                    <option value="squash">squash</option>
                                    <option value="yoga">yoga</option>
                                    <option value="dance">dance</option>
                                    <option value="exercise">exercise</option>
                                    <option value="other">other</option>
                                </select>
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Description:</b>
                            <textarea rows="4" cols="30" style={{marginLeft:'80px'}} defaultValue={data["description"] || description} onChange={(event) => handleDescription(event)}></textarea>
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Age range:</b>
                            <select id="dropdown" style={{marginLeft:'100px',width:'300px'}} defaultValue={data["age_range"] || ageRange} onChange={handleAgeRange}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="all">all</option>
                                    <option value="under 18">under 18</option>
                                    <option value="18 and above">18 and above</option>
                            </select>
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Address:</b>
                            <input type="text" style={{marginLeft:'120px'}} defaultValue={data["address"] || address} onChange={(event) => handleAddress(event)}/>
                        </div>
                        <div class="input-container">
                        <b style={{color:'var(--text-color)'}}>City:</b>
                        <input type="text" defaultValue={data["city"] || city} 
                                    onChange={(event) => handleCity(event)} />
                        </div>
                        <div class="input-container">
                        <b style={{color:'var(--text-color)'}}>State:</b>
                        <input type="text" defaultValue={data["state"] || state} 
                                    onChange={(event) => handleState(event)} />
                        </div>
                        <div className="input-container">
                            <b style={{color:'var(--text-color)'}}>Date:</b>
                            <DatePicker 
                                className="custom-datepicker"
                                selected={date} 
                                onChange={(date) => handleDate(date)} 
                                dateFormat="MM/dd/yyyy" 
                                showYearDropdown
                                showMonthDropdown
                                minDate={new Date()}
                                maxDate={new Date("2030-12-31")} 
                            />
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Start Time:</b>                            
                            <TimePicker
                                disableClock={true}
                                format="h:m a"
                                value={starttime}
                                defaultValue={data["start_time"] || starttime}
                                onChange={handleStartTime}
                            />
                            
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>End Time:</b>
                            <TimePicker
                                disableClock={true}
                                format="h:m a"
                                value={endtime}
                                defaultValue={data["end_time"] || endtime}
                                onChange={handleEndTime}
                            />
                            
                        </div>
                        <div class="input-container">
                        <b style={{color:'var(--text-color)'}}>Capacity:</b>
                            <input type="text" style={{marginLeft:'120px'}} defaultValue={data["capacity"] || capacity}  onChange={(event) => handleCapacity(event)}/>
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Cost:</b>
                            <input type="text" style={{marginLeft:'170px'}} defaultValue={data["cost"] || cost}  onChange={(event) => handleCost(event)}/>
                        </div>
                        <div class="input-container">
                            <b style={{color:'var(--text-color)'}}>Upload Image:</b>
                            <input type="file" style={{marginLeft:'170px'}} defaultValue={data["image"] || image}  onChange={(event) => handleImage(event)}/>
                        </div>
                        <div class="input-container">
                            <b style={{color:"var(--text-color)"}}>Organizer: {profileData["firstname"]+" "+profileData["lastname"]+" "+"("+profileData["email"]+")"}</b>
                        </div>
                        <br></br>

                        {editId ? (
                            <button class="event_button" onClick={handleSaveEdit}>Save Edit</button>
                        ) : (
                            <button class="event_button" onClick={handleSubmit}>Create Event</button>
                        )}

                        {showAlert && (
                                <Alert
                                severity="success"
                                iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}
                                >
                                Event Created
                                </Alert>
                        )}

                        {showSaveAlert && (
                                <Alert
                                severity="success"
                                iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}
                                >
                                Event edited successfully
                                </Alert>
                        )}
                    </div>
                </div>
        </div>
        </div>

    );

}

export default OrganizeEvent;
