import React from 'react'
import {Routes, Route} from "react-router-dom"
import WelcomeScreen from '../Pages/WelcomeScreen/WelcomeScreen'

function ComponentRouting() {
  return (
    <Routes>
        <Route path='welcome' element={<WelcomeScreen/>}/>
    </Routes>
  )
}

export default ComponentRouting