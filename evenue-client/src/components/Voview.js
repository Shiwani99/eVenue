
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';






// function Voview(){

//      //const navigate = useNavigate();
//      const [venuename, setVenuename] = useState('');
//      const [location, setLocation] = useState('');
//      const [time, setTime] = useState('');
//      const [date, setDate] = useState('');
//      const [createdEvents, setCreatedEvents] = useState([]);
//      const [eventStatus, setEventStatus] = useState(false);



//      // Need to configure this and show up on venueowner page for his events
//      // For now commenting this
//     // axios.get('/dashevents')
//     //     .then(res =>{
//     //         if (res.status >=200 && res.status < 300){
//     //             return res.data;
//     //         }
//     //         else{
//     //             throw new Error("!!ERROR!!  "+res.status);
//     //         }
//     //     })
//     //     .then(data => {
//     //         console.log(data)
//     //     })
//     //     .catch((error) => {
//     //         console.log(error.response)
//     //     });


//     function Transferprofile(event){
//         console.log("Transfer Prof...");

//         event.preventDefault();



//     }


//     function CreateVenue(event){
//         console.log("Ekazuuu!");

//         event.preventDefault();
//         console.log("Inside event creation");
//         axios({
//             method: "POST",
//             url: '/voview',
//             data: {
//                 venuename : venuename,
//                 location : location,
//                 time : time,
//                 date : date,
//                 eventStatus : eventStatus
//             }
            
//         })
//         .then((response) => {
//             const res = response.data
//             console.log(res.message);
//             // Add the newly created event to the state
//             setCreatedEvents([...createdEvents, res.event]);
//             // Reset the form fields
//             setVenuename('');
//             setLocation('');
//             setTime('');
//             setDate('');
//             setEventStatus('');
//         })
//         .catch((error)=>{
//             console.log(error.response)
//         })

//     }

        
    

// return(
//     <div>
//     <h1>Venue Owner View</h1>


//     {/* <div>
//         <button style={{backgroundColor: '#ffbd59',color:'black'}} onClick={CreateVenue}>Create Venue</button>
//     </div> */}

//     <div>
//     <Card.Body>
//     <Form onSubmit={CreateVenue}>
//         <Form.Group className="mb-3" controlId="venuename">
//             <Form.Label>Venue Name</Form.Label>
//             <Form.Control type="venuename" name='venuename' placeholder="Enter Venue name" value={venuename} onChange={(event) => setVenuename(event.target.value)} required />
//             <Form.Text className="text-muted">
//             </Form.Text>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="location">
//             <Form.Label>Location</Form.Label>
//             <Form.Control type="location" name='location' placeholder="Enter event location" value={location} onChange={(event) => setLocation(event.target.value)} required />
//             <Form.Text className="text-muted">
//             </Form.Text>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="time">
//             <Form.Label>Time</Form.Label>
//             <Form.Control type="time" name='time' placeholder="Enter time" value={time} onChange={(event) => setTime(event.target.value)} required />
//             <Form.Text className="text-muted">
//             </Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="date">
//             <Form.Label>Date</Form.Label>
//             <Form.Control type="date" name='date' placeholder="Enter Date(MM/DD/YYYYY)" value={date} onChange={(event) => setDate(event.target.value)} required />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="eventstatus">
//             <Form.Label>EventStatus</Form.Label>
//             <Form.Control as="select" name='eventStatus' placeholder="Select true/false" value={eventStatus} onChange={(event) => setEventStatus(event.target.value)} required >
//                 <option value="">Select</option>
//                 <option value={true}>True</option>
//                 <option value={false}>False</option>
//             </Form.Control>
//         </Form.Group>

//         <Button style={{backgroundColor: '#ffbd59', color: 'black'}} type='submit'>Create Event</Button>
//     </Form>
// </Card.Body>




//     </div>
//     <div>
//         <br></br>
//         <br></br>
//         <h3>Click on the button below to view previously created events</h3>
//         <br></br>
//         <br></br>
//     <button style={{backgroundColor: '#ffbd59',color:'black'}} onClick={Transferprofile}> Previous events </button>
       
//     </div>
//     </div>
// );
// }

// export default Voview;

import './Voview.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import TopNav from './Navbar';

function Voview(){

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
  

     const navigate = useNavigate();
     const [venuename, setVenuename] = useState('');
     const [location, setLocation] = useState('');
     const [time, setTime] = useState('');
     const [date, setDate] = useState('');
     const [createdEvents, setCreatedEvents] = useState([]);
     const [eventStatus, setEventStatus] = useState(false);
     const [city,setCity] = useState('');
     const [state,setState] = useState('');
     const [image, setImage] = useState(null);
            

    function Transferprofile(event){
        console.log("Transfer Prof...");
        // Use the Link component to navigate to the voprofile.js page
        // Replace '/voprofile' with the appropriate path for voprofile.js in your application
        event.preventDefault();
        // return (
        //     <Link to="./components/Voprofile">
        //         {/* You can customize the button text and style as needed */}
        //         <button style={{backgroundColor: '#ffbd59',color:'black'}}> Previous events </button>
        //     </Link>
        // );

        navigate('/voprofile'); 
    }
            
    function handleImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result;
          setImage(dataUrl);
        };
        reader.readAsDataURL(file);

      }

    function CreateVenue(event){
        console.log("Ekazuuu!");
        event.preventDefault();
        console.log("Inside event creation");
        fetch('https://evenues.herokuapp.com/voview', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  mode : 'cors',
  body: JSON.stringify({
    venuename : venuename,
    location : location,
    time : time,
    date : date,
    eventStatus : eventStatus,
    city : city,
    state : state
  })
})
.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then((data) => {
  const res = data;
  console.log(res.message);
  // Add the newly created event to the state
  setCreatedEvents([...createdEvents, res.event]);
  // Reset the form fields
  setVenuename('');
  setLocation('');
  setTime('');
  setDate('');
  setEventStatus('');
  setCity('');
  setState('');
  setImage('');
})
.catch((error) => {
  console.error('There was a problem with the fetch operation:', error);
});
    }

    return(
        <div className="bag-voview"> 
     <TopNav/>
     <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <br></br>
        <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>  
        <div>
        

            <h1 style = {{color: 'var(--text-color)',fontWeight:'bold'}}>Venue Owner View</h1>
        <br></br>
        <div className='voview'>
    <Card.Body>
    <Form onSubmit={CreateVenue}>
        <Form.Group className="mb-3" controlId="venuename">
            <Form.Label>Venue Name</Form.Label>
            <Form.Control type="venuename" name='venuename' placeholder="Enter Venue name" value={venuename} onChange={(event) => setVenuename(event.target.value)} required />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="location" name='location' placeholder="Enter event location" value={location} onChange={(event) => setLocation(event.target.value)} required />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="city" name='city' placeholder="Enter event City" value={city} onChange={(event) => setCity(event.target.value)} required />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
            <Form.Label>State</Form.Label>
            <Form.Control type="state" name='state' placeholder="Enter event State" value={state} onChange={(event) => setState(event.target.value)} required />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" name='time' placeholder="Enter time" value={time} onChange={(event) => setTime(event.target.value)} required />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name='date' placeholder="Enter Date(MM/DD/YYYYY)" value={date} onChange={(event) => setDate(event.target.value)} required />
        </Form.Group>
        
        <Form.Group controlId="image">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleImage} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="eventstatus">
            <Form.Label>Venue Status</Form.Label>
            <Form.Control as="select" name='eventStatus' placeholder="Select true/false" value={eventStatus} onChange={(event) => setEventStatus(event.target.value)} required >
                <option value="">Select</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </Form.Control>
        </Form.Group>

        <Button className='btn-voview' type='submit'>Create Event</Button>
    </Form>
</Card.Body>


            </div>
            <div>
                <br></br>
                
                <h3>Click on the button below to view previously created venues</h3>
                <br></br>
                
                <Button className='btn-voview' onClick={Transferprofile}> Previous events </Button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default Voview;



