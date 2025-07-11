import { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import CityPage from './components/CityPage'
import Register from './components/Register'
import Login from './components/Login'
import './App.css'
import CityDetails from './components/CityDetails'
import Navigation from './components/navigation'
import ExperienceDetails from './components/ExperienceDetails'
import Destinations from './components/Destinations'
import Account from './components/Account'
import CreateTrip from './components/CreateTrip'

function App() {
  const [token, setToken] = useState (null);
  const [userId, setUserId] = useState (null);
  


    useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <>
    <nav>  
    <Navigation token={token} setToken={setToken} setUserId={setUserId} userId={userId}/>
    </nav>
     <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cities" element={<CityPage/>}/>
        <Route path="/cities/:id" element={<CityDetails/>}/>
        <Route path="/destinations" element={<Destinations/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId}/>}/>
        <Route path="/experiences/:id" element={<ExperienceDetails/>}/>
        <Route path='/account' element={token ? <Account token={token} /> : <Navigate to="/login" />} />
        <Route path='/createtrip' element={<CreateTrip/>}/>
      </Routes>
    </>
  )
}

export default App
