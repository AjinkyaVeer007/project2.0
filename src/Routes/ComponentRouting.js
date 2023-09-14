import React from 'react'
import {Routes, Route} from "react-router-dom"
import WelcomeScreen from '../Pages/WelcomeScreen/WelcomeScreen'
import Projects from '../Pages/Projects/Projects'
import Company from '../Pages/Company/Company'

function ComponentRouting() {
  return (
    <Routes>
        <Route path='welcome' element={<WelcomeScreen/>}/>
        <Route path='projects' element={<Projects/>}/>
        <Route path='createcompany' element={<Company/>}/>
    </Routes>
  )
}

export default ComponentRouting