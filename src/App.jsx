import { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import CityPage from './components/CityPage'
import Register from './components/Register'
import Login from './components/Login'
import './App.css'
import CityDetails from './components/CityDetails'
import Navigation from './components/navigation'

function App() {
  const [token, setToken] = useState (null);
  const [userId, setUserId] = useState (null);
  


    //set token in localStorage
      useEffect(() => {
        const invalidTokens = ['Not authorized.', "Unable to login"];

        if (token && !invalidTokens.includes(token)) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
        }
      }, [token]);


      //retrieve token from localStorage
  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      setToken(storedToken)
    }
  },[]);

      //set user in localStorage
  useEffect(() => {
    if (token)  {
      localStorage.setItem("userId", userId)
    }else{
      localStorage.removeItem("userId")
    }
  }, [userId]);


      //retrieve user from localStorage
  useEffect(()=>{
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId){
      setUserId(storedUserId)
    }
  },[]);

  return (
    <>
    <nav>  
    <Navigation token={token} setToken={setToken} setUserId={setUserId} userId={userId}/>
    </nav>
     <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cities" element={<CityPage/>}/>
        <Route path="/cities/:id" element={<CityDetails/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
