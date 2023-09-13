import React from 'react'
import {Routes, Route} from "react-router-dom"
import WelcomeScreen from '../Pages/WelcomeScreen/WelcomeScreen'
import Projects from '../Pages/Projects/Projects'

function ComponentRouting() {
  return (
    <Routes>
        <Route path='welcome' element={<WelcomeScreen/>}/>
        <Route path='projects' element={<Projects/>}/>
    </Routes>
  )
}

export default ComponentRouting