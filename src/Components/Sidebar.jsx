import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeData } from "../Store/activeSlice";
import { userData } from "../Store/userSlice";
import { companyData } from "../Store/companySlice";
import { employeeData } from "../Store/employeeSlice";
import { useNavigate } from "react-router-dom";
import { projectData } from "../Store/projectSlice";
import { assignEmployeesList } from "../Store/assignEmployeesSlice";
import { activeProjectId } from "../Store/activeProject";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get data from store
  const activeItemDetails = useSelector((state) => state.activeItemData);
  const userDetails = useSelector((state) => state.userData);

  const sidebarAdmin = [
    {
      id: "#$dashboardAdmin",
      name: "Dashboard",
      icon: "bi bi-house-fill",
    },
    {
      id: "#$createproject",
      name: "Create Project",
      icon: "bi bi-clipboard-data-fill",
    },
    {
      id: "#$allproject",
      name: "All Projects",
      icon: "bi bi-kanban-fill",
    },
    {
      id: "#$logout",
      name: "Logout",
      icon: "bi bi-door-closed-fill",
    },
  ];

  const sidebarEmployee = [
    {
      id: "#$dashboardEmployee",
      name: "Dashboard",
      icon: "bi bi-house-door-fill",
    },
    {
      id: "#$logout",
      name: "Logout",
      icon: "bi bi-box-arrow-left",
    },
  ];

  const [sidebarContent, setSidebarContent] = useState([]);

  const handleSidebarContent = () => {
    userDetails.userType === "Employee"
      ? setSidebarContent(sidebarEmployee)
      : setSidebarContent(sidebarAdmin);
  };

  const handleAllProjects = () => {
    navigate("/auth/dashboard/projects");
  };

  const handleActiveItem = (item) => {
    // dispatch active item id
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: item.id,
      })
    );
    switch (item.id) {
      case "#$dashboardAdmin":
        navigate("/auth/dashboard/admin/welcome");
        break;
      case "#$dashboardEmployee":
        navigate("/auth/dashboard/employee/welcome");
        break;
      case "#$createcompany":
        navigate("/auth/dashboard/createcompany");
        break;
      case "#$allproject":
        handleAllProjects();
        break;
      case "#$createproject":
        navigate("/auth/dashboard/createproject");
        break;
      case "#$logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: null,
      })
    );
    dispatch(companyData(null));
    dispatch(userData(null));
    dispatch(employeeData([]));
    dispatch(projectData([]));
    dispatch(
      assignEmployeesList({
        type: "assignEmployees",
        value: [],
      })
    );
    dispatch(
      assignEmployeesList({
        type: "assignManagers",
        value: [],
      })
    );
    dispatch(activeProjectId(null));
    navigate("/");
  };

  useEffect(() => {
    handleSidebarContent();
  }, []);

  return (
    <div>
      {sidebarContent &&
        sidebarContent.map((item, index) => (
          <div
            key={item.id}
            style={{ animationDelay: `${Number(index) * 100}ms` }}
            className={`${
              activeItemDetails.sidebarActiveItem === item.id
                ? "secondary-bgcolor text-white"
                : "text-white"
            } sidebarItem cursor-pointer d-flex gap-2 align-items-center justify-content-start ms-3 me-2 mt-2 p-2 rounded-2`}
            onClick={() => {
              handleActiveItem(item);
            }}
          >
            <div className={item.icon}></div>
            <div>{item.name}</div>
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
