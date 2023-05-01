import Home from './Home';
import axios from "axios";

function Logout() {
    /*
    axios({
        method: "GET",
        url: '/logout',
        withCredentials: true
    })
    .then((response) => {
        const res = response.data
        console.log(res.message)
    })
    .catch ((err) => {
      console.log(err.response)
    })
    */

    fetch('https://evenues.herokuapp.com/logout', {
        method: 'GET',
        mode: 'cors', // sets the mode of the request to CORS
        credentials: 'include', // includes credentials like cookies in the request
        headers: {
          'Content-Type': 'application/json', // sets the Content-Type header to JSON
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error(error);
      });
      

    return (
        <Home/>
    )
}

export default Logout;