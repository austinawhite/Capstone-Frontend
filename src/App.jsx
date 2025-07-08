import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import CityPage from './components/CityPage'

import './App.css'
import CityDetails from './components/CityDetails'

function App() {


  return (
    <>
     <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cities" element={<CityPage/>}/>
        <Route path="/cities/:id" element={<CityDetails/>}/>
      </Routes>
    </>
  )
}

export default App
