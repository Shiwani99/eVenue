import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import TopNav from "./Navbar";
import Table from 'react-bootstrap/Table'
//import TopNav from "./Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from 'react-bootstrap/Spinner';

var arr = new Array();

function Voprofile() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch data from backend

    /*
    axios({
      method: "GET",
      url: "/voprofile"
    })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.log(error.response);
      });
      */

      fetch('https://evenues.herokuapp.com/voprofile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data);
        setEvents(data); // Set the fetched data to state
      })
      .catch(error => {
        console.log(error);
      });
      




  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  const handleClose = (event_id) => {
    // Remove the event from the events array
    const updatedEvents = events.filter(event => event._id !== event_id);
    setEvents(updatedEvents);

    /*
    // Update the eventStatus in MongoDB to closed
    axios({
      method: "PUT",
      url: `/voprofile/${event_id}`, // Update the URL pattern to include the eventId
      data: { eventStatus: 'false' } // Set the eventStatus to false to indicate closed
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
      */

      fetch(`https://evenues.herokuapp.com/voprofile/${event_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "credentials": "include"
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ eventStatus: 'false' })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
      


  }

  return (
    <div className="bag"> 
    <TopNav/>
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
       <br></br>
       <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>  
       <br></br>
    <div style={{height:'100vh'}}>
      <h1 style = {{color: 'var(--text-color)',fontWeight:'bold'}}>Manage Venues</h1>
      <br></br>
      <Col classname="col-md-8">
    <div className="filter-container" >
      
        <Table striped="columns">
          <thead>
            <tr>
              <th style={{color:'var(--text-color)'}}>Venue Name</th>
              <th style={{color:'var(--text-color)'}}>Location</th>
              <th style={{color:'var(--text-color)'}}>Date</th>
              <th style={{color:'var(--text-color)'}}>Time</th>
              <th style={{color:'var(--text-color)'}}>City</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event =>  (
              <tr key={event._id}>
                <td style={{color:'var(--text-color)'}}>{event.venuename}</td>
                <td style={{color:'var(--text-color)'}}>{event.location}</td>
                <td style={{color:'var(--text-color)'}}>{event.date}</td>
                <td style={{color:'var(--text-color)'}}>{event.time}</td>
                <td style={{color:'var(--text-color)'}}>{event.city}</td>
                <button variant='outline-primary' className="btn-voprofile" onClick={() => handleClose(event._id)}>Close Venue</button>
              </tr>
              ))}
          </tbody>      
        </Table>
    </div>
    </Col>
    </div>
    </div>
    </div>
  );
}

export default Voprofile;


























































// //import axios from "axios";
// //import { useState, useEffect } from "react";


// // function Voprofile(){
// //     console.log("voprof page");
// //     axios({
// //         method: "GET",
// //         url: '/voprofile',
        
// //     })
// //     .then((response) => {
// //         console.log(response.data);
// //     })
// //     .catch((error)=>{
// //         console.log(error.response);
// //     })



// // return(
// // <h1>Manage Events</h1>

// // );


// // }
// // export default Voprofile;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Form from 'react-bootstrap/Form';

// // function Voprofile() {
// //   const [events, setEvents] = useState([]);
// //   const [eventStatus, setEventStatus] = useState(false);

// //   useEffect(() => {
// //     // Fetch data from backend
// //     axios({
// //       method: "GET",
// //       url: "/voprofile"
// //     })
// //       .then((response) => {
// //         console.log(response.data);
// //         setEvents(response.data); // Set the fetched data to state
// //       })
// //       .catch((error) => {
// //         console.log(error.response);
// //       });
// //   }, []); // Empty dependency array to ensure the effect runs only once on component mount

// //   return (
// //     <div>
// //       <h1>Manage Events</h1>
// //       <ul>
// //         {events.map(event => (
// //           <li key={event.date + event.time}>
// //             <p>Date: {event.date}</p>
// //             <p>Time: {event.time}</p>
// //             <p>Location: {event.location}</p>
// //             <p>Owner: {event.owner}</p>
// //             <p>Venue Name: {event.venuename}</p>

// //               <select onChange={(event) => setEventStatus(event.target.value)} required  >
// //                 <option value="">Select</option>
// //                 <option value={true}>True</option>
// //                 <option value={false}>False</option>
// //               </select>
 


// //             <p>Event Status: {event.eventStatus}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default Voprofile;







// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Form from 'react-bootstrap/Form';

// // function Voprofile() {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     // Fetch data from backend
// //     axios({
// //       method: "GET",
// //       url: "/voprofile"
// //     })
// //       .then((response) => {
// //         console.log(response.data);
// //         setEvents(response.data); // Set the fetched data to state
// //       })
// //       .catch((error) => {
// //         console.log(error.response);
// //       });
// //   }, []); // Empty dependency array to ensure the effect runs only once on component mount

// //   const handleEventStatusChange = (eventId, eventStatus) => {
// //     // Update the eventStatus locally
// //     const updatedEvents = events.map(event => {
// //       if (event._id === eventId) {
// //         return { ...event, eventStatus };
// //       }
// //       console.log(event+" return data");
// //       return event;
// //     });
  
// //     console.log("eventId check: " + eventId);
// //     setEvents(updatedEvents);
  
// //     // Update the eventStatus in MongoDB
// //     axios({
// //       method: "PUT",
// //       url: `/voprofile/${eventId}`, // Update the URL pattern to include the eventId
// //       data: { eventStatus }
// //     })
// //       .then((response) => {
// //         console.log(response.data);
// //       })
// //       .catch((error) => {
// //         console.log(error.response);
// //       });
// //   }
  

// //   return (
// //     <div>
// //       <h1>Manage Events</h1>
// //       <ul>
// //         {events.map(event => (
// //           <li key={event._id}>
// //             <p>Date: {event.date}</p>
// //             <p>Time: {event.time}</p>
// //             <p>Location: {event.location}</p>
// //             <p>Owner: {event.owner}</p>
// //             <p>Venue Name: {event.venuename}</p>

// //             <select
// //               onChange={(event) => handleEventStatusChange(event._id, event.target.value === 'true')}
// //               value={event.eventStatus.toString()}
// //               required
// //             >
// //               <option value="true">True</option>
// //               <option value="false">False</option>
// //             </select>

// //             <p>Event Status: {event.eventStatus.toString()}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default Voprofile;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Form from 'react-bootstrap/Form';

// var arr = new Array();

// function Voprofile() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch data from backend
//     axios({
//       method: "GET",
//       url: "/voprofile"
//     })
//       .then((response) => {
//         console.log(response.data);
//         // arr = response.data
//         // console.log("Storing events in array: "+arr);
//         setEvents(response.data); // Set the fetched data to state
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   }, []); // Empty dependency array to ensure the effect runs only once on component mount



//   function handleClose(event){

//   }

//   const handleEventStatusChange = (eventStatus, event_id) => {
//     // Update the eventStatus locally
//     const updatedEvents = events.map(event => {
//       // if (event._id === event_id) {
//       //   return { ...event, eventStatus };
//       // }
    
//       console.log(event+" return data");
//       console.log("eventId check: " + eventStatus);
//       console.log("event_id check: "+ event_id);
//       return event;
//     });
  

//     setEvents(updatedEvents);
  
//     // Update the eventStatus in MongoDB
//     axios({
//       method: "PUT",
//       url: `/voprofile/${event_id}`, // Update the URL pattern to include the eventId
//       data: { eventStatus }
//     })
//       .then((response) => {
//         console.log(response.data);
//         console.log("response data: "+response.data);
//       })
//       .catch((error) => {
//         console.log(error.response);
//         console.log("error part");
//       });
//   }
  
  

//   return (
//     <div>
//       <h1>Manage Events</h1>
//       <ul>
//         {events.map(event => (
        
//           <li key={event._id}>
//             <p>Date: {event.date}</p>
//             <p>Time: {event.time}</p>
//             <p>Location: {event.location}</p>
//             <p>Owner: {event.owner}</p>
//             <p>Venue Name: {event.venuename}</p>

//             <Button variant='outline-primary' onClick={handleClose}>Close Venue</Button>

// <select
//   onChange={(event) => handleEventStatusChange(event.target.value, event.target.id_val)}
//   value={event.eventStatus.toString()}
//   id_val = {event._id}
//   required
// >

//               <option value="true">True</option>
//               <option value="false">False</option>
//             </select>

//             <p>Event Status: {event.eventStatus.toString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Voprofile;
