import React from 'react'
import {Routes, Route} from "react-router-dom"
import WelcomeScreen from '../Pages/WelcomeScreen/WelcomeScreen'
import Projects from '../Pages/Projects/Projects'
import Company from '../Pages/Company/Company'
import CreateProject from '../Pages/CreateProject/CreateProject'
import ViewProject from '../Pages/ViewProject/ViewProject'

function ComponentRouting() {
  return (
    <Routes>
        <Route path='welcome' element={<WelcomeScreen/>}/>
        <Route path='projects' element={<Projects/>}/>
        <Route path='createcompany' element={<Company/>}/>
        <Route path='createproject' element={<CreateProject/>}/>
        <Route path='project/view' element={<ViewProject/>}/>
    </Routes>
  )
}

export default ComponentRouting