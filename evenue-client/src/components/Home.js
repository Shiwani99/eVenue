import TopNav from './Navbar'
import './Home.css'
import Container from 'react-bootstrap/esm/Container'
import SearchBar from './SearchBar'
import InfoCard from './InfoCard'
import Car from './Carousel'
import axios from 'axios'
import { useState } from 'react'
import { set } from 'react-hook-form'

function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
    const activity = [
        {  
            'name': 'Zumba',
            'venue':'SRSC Studio 1',
            'date': '05/01/2023 7:00 PM',
            'img': 'activity1.jpg'
        },
        {
            'name': 'Yoga',
            'venue': 'SRSC Studio 3',
            'date': '05/2/2023 9:00 AM',
            'img': 'activity2.jpg'
        },
        {
            'name': 'Strength',
            'venue': 'Gym',
            'date': '05/03/2023 7:00 PM',
            'img': 'activity3.jpg'
        },
        {
            'name': 'Cardio',
            'venue': 'Gym',
            'date': '05/04/2023 5:00 PM',
            'img': 'activity4.jpeg'
        },
        {
            'name': 'Cycle',
            'venue': 'SRSC Hall 2',
            'date': '05/05/2023 4:00 PM',
            'img': 'activity5.jpg'
        }]

    return (
        <div className="bg" >
            <div style={{ alignSelf: 'center', alignContent:'center'}}>
            <TopNav />
            <Container style={{ left:'5%', height: '50px', width: '100%', marginTop: '45vh', background: 'transparent', alignItems: 'center'}}>
                <SearchBar/>
            </Container>
            <br></br>
            <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            
            <button className='btn-about' onClick={toggleTheme}>Toggle Theme</button>
            
            <p style={{left: '10vh', marginTop: '10vh', color: 'var(--text-color)'}}>
                Most Popular Activities!</p>
            <Container style={{left: '5%', width: '100%', justifyContent:'center'}}>
                <InfoCard activity={activity}/>
            </Container>  
            <Container style={{left: '5%', marginTop: '10vh',marginBottom: '5px', width: '100%'}}>
                <Car />  
            </Container>
            </div>   
        </div>
        </div>
    )
}

export default Home;