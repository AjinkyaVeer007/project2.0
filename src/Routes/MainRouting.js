import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import AdminDashboard from '../Pages/Dashboard/AdminDashboard/AdminDashboard'

function MainRouting() {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/auth/admin/dashboard' element={<AdminDashboard/>} />
    </Routes>
  )
}

export default MainRouting