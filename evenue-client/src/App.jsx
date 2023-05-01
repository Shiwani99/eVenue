import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Home from './components/Home'
import Navbar from './components/Navbar'
import SearchPage from './components/SearchPage'
//import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import {useForm} from "react-hook-form";
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import UserProfile from './components/UserProfile';
import Logout from './components/Logout';
import ResetPassword from './components/resetPassword';
import Organize from './components/OrganizeEvent';
import ChatsPage from "./components/chatsPage";
import ASearchPage from './components/SearchActivities'
import PSearchPage from './components/SearchPlayers'
import InviteFriends from './components/InviteFriends.js'
import Voview from './components/Voview';
import Voprofile from './components/Voprofile';
import TwoFA from './components/TwoFA';
import Participants from './components/Participants';
import Payment from './components/Payment';
import About from './components/Aboutus';
import Contacts from './components/Contacts';
import CalendarPage from './components/MyCalendar';

function App() {
  // const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // const { trial, setTrial} = useState('')
  // const [serverResponse,setServerResponse]=useState('')
  // const [data, setData] = useState(null)

  // function submitForm() {
  //   axios({
  //     method: "GET",
  //     url: '/profile',
  //   })
  //   .then((response) => {
  //     const res = response.data
  //     setData(({
  //       profile_name: res.name,
  //       about: res.about
  //     }))
  //   })
  //   .catch((err) => {
  //     if (err.response) {
  //       console.log(err.response)
  //     }
  //   })
  // }

  return (
  //   <div className='App'>
  //   <p>To get your profile details: </p><button onClick={submitForm}>Click me</button>
  //       {data && <div>
  //             <p>Profile name: {data.profile_name}</p>
  //             <p>About me: {data.about}</p>
  //           </div>
  //       }
  //   </div>


    <div className="App">
      <header className="App-header">
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/Login' element= {<LoginPage/>} />
              <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
              <Route path ='/Register' element={<Register/>}/>
              <Route path ='/Search' element={<SearchPage/>}/>
              <Route path = '/Profile' element={<UserProfile/>} />
              <Route path = '/Logout' element={<Logout/>} />
              <Route path ='/resetpassword/:id/:token' element={<ResetPassword/>} />
              <Route path = '/organize_event' element={<Organize/>} />
              <Route path = '/chat' element={<ChatsPage/>} />
              <Route path = '/invite_friends' element={<InviteFriends />} />
              <Route path = '/Voview' element={<Voview/>}/>
              <Route path='/Voprofile' element={<Voprofile/>}/>
              <Route path = '/2fa' element={<TwoFA/>}/>
              <Route path = '/view_participants' element={<Participants/>}/>
              <Route path = '/payment' element={<Payment/>}/>
              <Route path = '/About' element={<About/>}/>
              <Route path = '/Contacts' element={<Contacts/>}/>
              <Route path = '/calendar' element={<CalendarPage/>}/>
              {/* <Route path = '/Activites' element={<Activities />} /> */}
              {/* <Route path = 'Sports' elemetn = {<SportsPage/>} /> */}
          </Routes>
        </BrowserRouter>
      </header>


    </div>
  );
}

export default App;
