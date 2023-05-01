import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import "./UserProfile.css"; 
import axios from 'axios';
import TopNav from './Navbar';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { ChatEngineCore } from 'chat-engine';

function UserProfile () {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const[data,setData]=useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [organizeEdit,setOrganizeEdit] = useState(false);
  const navigate=useNavigate();
  const [chatPage,setChatPage] = useState(false);
  let participants=[]


  const URL="https://evenuee.herokuapp.com/Profile";
  
  useEffect(()=>{
    /*
    axios.get("https://evenues.herokuapp.com/profile_data")
      .then(response => {
        //console.log(response)
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      })},[URL]);
    */

      fetch("https://evenues.herokuapp.com/profile_data", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors"
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then(data => {
          setData(data);
        })
        .catch(error => {
          console.error(error);
        });
      },[URL]);
  
  

  console.log("->"+data);
  
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");

  const [age,setAge] = useState("");
  const [gender,setGender] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [skilllevel,setSkillLevel] = useState("");
  const [availability,setAvailability] = useState("");
  const [sports,setSports] = useState([]);
  const [jsonData, setJsonData] = useState({});
  const sports_name=["tennis","badminton","squash","football","basketball","table tennis","volleyball","other"];
  const [searchText, setSearchText] = useState('');
  

  function handleSaveUpdate(){
    
    /*
    axios.post('https://evenues.herokuapp.com/update_user_details',jsonData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setIsEditing(false);
    });*/

    fetch('https://evenues.herokuapp.com/update_user_details', {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(jsonData)
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
})
.finally(() => {
  setIsEditing(false);
});


  }

  function updateFirstName(event){
      setFirstName(event.target.value);
        setJsonData({
          ...jsonData,
          "firstname": event.target.value
        });
  }

  function updateLastName(event){
        setLastName(event.target.value);
        setJsonData({
          ...jsonData,
          "lastname": event.target.value
        });
  }

  function updateAge(event){
      setAge(event.target.value);
      setJsonData({
        ...jsonData,
        "age": event.target.value
      });
  }

  function updateGender(event){
      setGender(event.target.value);
      setJsonData({
        ...jsonData,
        "gender": event.target.value
      });
  }
    
  function updateCity(event){
      setCity(event.target.value);
      setJsonData({
        ...jsonData,
        "city": event.target.value
      });
  }
  
  function updateState(event){
      setState(event.target.value);
      setJsonData({
        ...jsonData,
        "state": event.target.value
      });
  }

  function updateSkillLevel(event){
      setSkillLevel(event.target.value);
      setJsonData({
        ...jsonData,
        "skill_level": event.target.value
      });
  }

  function updateAvailability(event){
      setAvailability(event.target.value);
      setJsonData({
        ...jsonData,
        "availability": event.target.value
      });
  }

  function updateSports(event){
      setSports(event.target.value);
      setJsonData({
        ...jsonData,
        "sports": event.target.value
      });
  }

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  let age_set="";
  let gender_set="";
  let city_set="";
  let state_set="";
  let skill_set="";
  let availability_set="";
  let sports_set="";

  if(data.hasOwnProperty("age")){
  
    age_set=data["age"];
  }

  if(data.hasOwnProperty("gender")){
    gender_set=data["gender"];
  }

  if(data.hasOwnProperty("city")){
    city_set=data["city"];
  }

  if(data.hasOwnProperty("state")){
    state_set=data["state"];
  }

  if(data.hasOwnProperty("skill_level")){
    skill_set=data["skill_level"];
  }

  if(data.hasOwnProperty("availability")){
    availability_set=data["availability"];
  }

  if(data.hasOwnProperty("sports")){
    sports_set=data["sports"];
  }

  function handleViewUsers(id){
    navigate(`/view_participants?eid=${id}`)
  }

  
  function HandleCancelEvent(id){

    /*
    axios.post('https://evenues.herokuapp.com/cancel_event',{"eid":id})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    */

    fetch('https://evenues.herokuapp.com/cancel_event', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({ eid: id }),
})
.then(response => {
  console.log(response.data);
  alert("event has been cancelled successfully");
})
.catch(error => {
  console.log(error);
});
    
    //alert("event has been cancelled successfully");

}

  const filteredSports = sports_name.filter((sport) =>
  sport.toLowerCase().includes(searchText.toLowerCase())
);
const handleAddFavoriteSport = (sport) => {
  if (sports.length < 3 && !sports.includes(sport)) {
    setSports([...sports, sport]);
  }
};

useEffect(() => {
  setJsonData({
    ...jsonData,
    "sports": sports
  });
}, [sports]);

function handleDeleteSport(sportToRemove){
  const newSports = sports.filter((sport) => sport !== sportToRemove);
  setSports(newSports);
}

function handleEdit(id){
  navigate(`/organize_event?edit=${id}&userid=${data["_id"]}`)
}

function createDirectChat(name,group) {

  let participants=group
  participants.push(data["email"])

  const creds = {
    userName: data["email"],
    userSecret: process.env.userSecret,
    projectID: process.env.projectID
  };


  const options = {
    is_group_chat: true,
    title: `${name} group chat`,
    usernames: participants.concat([creds.userName])
  };


  getOrCreateChat(creds, options, () => {
    navigate('/chat');
  });
}




  return (
      
    <div className="profile-container"> 
     <TopNav/>
     <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <br></br>
        <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>  
    
    <div className="user-profile-container">      
      <div className="profile-content">
        <div >
          <div className="user-picture">
            <img src="https://via.placeholder.com/150" alt="User" />            
            {isEditing ? (
              <input type="text" id="firstNameEdit" name="firstNameEdit" value={firstName} onChange={updateFirstName} />
            ) :(
            <h2 style={{color:'var(--text-color'}}>{data["firstname"]}</h2>
            )}
            {isEditing ? (
              <input type="text" id="lastName" name="lastName" value={lastName} disabled={!isEditing} onChange={updateLastName} />
            ) :(
            <h2 style={{color:'var(--text-color'}}>{data["lastname"]}</h2>
            )}
          </div>
        </div>      
         
      <div >
        <div className="user-basic-data">
          {/*<h2>Personal Details</h2>  */}          
          <div >
            <div >
              <p style={{color:'var(--text-color'}}>Email:</p>
              <p style={{color:'var(--text-color'}}>{data["email"]}</p>
              <p style={{color:'var(--text-color'}}>Age: </p>
              {isEditing ? (
                <input type="text" id="age" name="age" value={age}  disabled={!isEditing} onChange={updateAge} />
              ) :(
              <p style={{color:'var(--text-color'}}>{age_set}</p>
              )}
              <p style={{color:'var(--text-color)'}}>Gender:</p>
              {isEditing ? (
                <select id="dropdown" value={gender} onChange={updateGender}>
                <option value="">--Please choose an option--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
              ) :(
              <p style={{color:'var(--text-color)'}}>{gender_set}</p>
              )}
              <p style={{color:'var(--text-color)'}}>City:</p>
              {isEditing ? (
                <input type="text" id="city" name="city" value={city}  disabled={!isEditing} onChange={updateCity} />
              ) :(
              <p style={{color:'var(--text-color)'}}>{city_set}</p>
              )}
              <p style={{color:'var(--text-color)'}}>State:</p>
              {isEditing ? (
                <input type="text" id="state" name="state" value={state}  disabled={!isEditing} onChange={updateState} />
              ) :(
              <p style={{color:'var(--text-color'}}>{state_set}</p>
              )}
            </div>              
          </div>
        </div>
      </div> 
           
      <div >
        <div className="user-other-interests">
          {/*<h2>Other Details</h2>*/}
          <div>
            <div >
              <p style={{color:'var(--text-color'}}>Skill level:</p>
                {isEditing ? (
                  <select id="dropdown" value={skilllevel} onChange={updateSkillLevel}>
                  <option value="">--Please choose an option--</option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  </select>
                ) :(
                <p style={{color:'var(--text-color'}}>{skill_set}</p>
                )}
              <p style={{color:'var(--text-color'}}>Availability:</p>
                {isEditing ? (
                  <select id="dropdown" value={availability} onChange={updateAvailability}>
                  <option value="">--Please choose an option--</option>
                  <option value="available any time">Available any time</option>
                  <option value="not available">Not available</option>
                  </select>
                ) :(
              <p style={{color:'var(--text-color'}}>{availability_set}</p>
              )}
              <p style={{color:'var(--text-color'}}>Favourite Sports:</p>
                {isEditing ? (
                  <input value={searchText} onChange={handleSearchTextChange} disabled={sports.length >= 3}/>
                ) :(
              <p style={{color:'var(--text-color'}}> {sports_set}</p>
              )}
                {isEditing ? (
                  searchText && (
                <ul>
                  {filteredSports.map((sport) => (
                    <li><button onClick={() => handleAddFavoriteSport(sport)}>{sport}</button></li>
                  ))}
                </ul>
                )
              ) : (
              <h2></h2>
              )}
                {isEditing ? (
                <ul>
                  {sports.map((sport) => (
                  <li key={sport}>
                    <button style={{color:"green"}} onClick={() => handleDeleteSport(sport)}>{sport}</button>
                  </li>
                ))}
                </ul>
              ) : (
              <h2></h2>
              )}
            </div>
          </div>
        </div>
      </div>
      </div> 
      <div>
        <div className="user-registered-events">
          <h3 style={{color:'var(--text-color)'}}>Events Organized by you</h3><br></br>
          {/*<h2>no events</h2>*/}
          {data && data.organized_events.length !== 0?(
                  data["organized_events"].map((json) => (
                    <tr key={json._id}>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.name}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.event_type}</td>
                      {/*<td style={{color:'black',fontSize:'1rem'}}>{json.description}</td>*/}
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.age_range}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.address}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.location}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.date}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.starttime}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.endtime}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.capacity}</td>
                      <td style={{color:'var(--text-color)',fontSize:'1rem'}}>{json.cost}</td>
                      {/*<td style={{color:'black',fontSize:'1rem'}}>{json.organizer}</td>*/}
                      <td><button onClick={() => handleViewUsers(json._id)}>View participants</button></td>
                      <td><button onClick={() => HandleCancelEvent(json._id)}>Cancel event</button></td>
                      <td><button onClick={() => handleEdit(json._id)}>Edit</button></td>
                      <td><button onClick={() => createDirectChat(json.name,json.participants)}>Chat with participants</button></td>
                    </tr> 
                                       
                  ))
                ):(console.log("error"))}
            <div>
              <div >
              </div>
            </div>
        </div>
      </div>
    <div>
    {isEditing ? (
          <button className='btn-uprofile' onClick={handleSaveUpdate}>Save Update</button>
        ) :(
          <button className='btn-uprofile' onClick={() => setIsEditing(true)}>Update</button>
        )}
    </div>
  </div>  
  </div>
  </div>
);
  
  };

  export default UserProfile;