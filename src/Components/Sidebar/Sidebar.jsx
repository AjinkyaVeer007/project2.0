import React, { useId } from "react";
import "./Sidebar.css";

function Sidebar() {
    const sidebarArr = [
        {   
            id: useId(),
            name: "Create Company",
            icon: "bi bi-person-workspace"
        },
        {   
            id: useId(),
            name: "All Projects",
            icon: "bi bi-list-task"
        },
        {   
            id: useId(),
            name: "Logout",
            icon: "bi bi-box-arrow-left"
        }
    ]

  return (
    <div>
      <div className="d-flex gap-2 align-items-center justify-content-center mt-2 fw-bold p-2 mx-2 rounded-2 shadow-sm company-name">
        <div className="bi bi-person-workspace"></div>
        <div>Company name</div>
      </div>
      <div className="mt-3">
      {sidebarArr && sidebarArr.map((item) => (
        <li key={item.id} className="sidebar-item d-flex gap-2 align-items-center justify-content-start ms-3 me-2 mt-4">
        <div className={`${item.icon}`}></div>
        <div>{item.name}</div>
      </li>
      ))}
      </div>
    </div>
  );
}

export default Sidebar;
