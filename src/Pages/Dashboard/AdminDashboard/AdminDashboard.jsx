import React, { useState } from 'react'
import "./AdminDashboard.css"

function AdminDashboard() {
    const [showSidebar, setShowSidebar] = useState(true)

    const sidebarToggle = () => {
        if(showSidebar){
            setShowSidebar(false)
        }else {
            setShowSidebar(true)
        }
    }

  return (
    <div className='d-flex'>
        <div className='sidebar' style={{width: showSidebar ? "18%" : "0%"}}></div>
        <div className='herosection position-relative' style={{width: showSidebar? "82%" : "100%"}}>
            <div onClick={sidebarToggle} className='position-absolute top-0 start-0 fs-2 text-white bi bi-list'></div>
        </div>
    </div>
  )
}

export default AdminDashboard;