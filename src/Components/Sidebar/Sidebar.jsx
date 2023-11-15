import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { activeData } from "../../Store/activeSlice";
import { userData } from "../../Store/userSlice";
import { companyData } from "../../Store/companySlice";
import { employeeData } from "../../Store/employeeSlice";
import { useNavigate } from "react-router-dom";
import { projectData } from "../../Store/projectSlice";
import { assignEmployeesList } from "../../Store/assignEmployeesSlice";

function Sidebar({ setShowSidebarFromTop }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get data from store
  const activeItemDetails = useSelector((state) => state.activeItemData);
  const companyDetails = useSelector((state) => state.companyData);
  const userDetails = useSelector((state) => state.userData);

  const sidebarAdmin = [
    {
      id: "#$dashboardAdmin",
      name: "Dashboard",
      icon: "bi bi-house-door-fill",
    },
    {
      id: "#$createcompany",
      name: "Create Company",
      icon: "bi bi-building-add",
    },
    {
      id: "#$createproject",
      name: "Create Project",
      icon: "bi bi-clipboard-data",
    },
    {
      id: "#$allproject",
      name: "All Projects",
      icon: "bi bi-list-task",
    },
    {
      id: "#$logout",
      name: "Logout",
      icon: "bi bi-box-arrow-left",
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
    navigate("/auth/admin/dashboard/projects");
  };

  const handleActiveItem = (item) => {
    // dispatch active item id
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: item.id,
      })
    );
    dispatch(
      activeData({
        name: "topSidebarActive",
        value: false,
      })
    );
    switch (item.id) {
      case "#$dashboardAdmin":
        navigate("/auth/admin/dashboard/admin/welcome");
        break;
      case "#$dashboardEmployee":
        navigate("/auth/admin/dashboard/employee/welcome");
        break;
      case "#$createcompany":
        navigate("/auth/admin/dashboard/createcompany");
        break;
      case "#$allproject":
        handleAllProjects();
        break;
      case "#$createproject":
        navigate("/auth/admin/dashboard/createproject");
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
    navigate("/");
  };

  const handleHome = () => {
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: "#$dashboard",
      })
    );
    dispatch(
      activeData({
        name: "topSidebarActive",
        value: false,
      })
    );
    navigate("/auth/admin/dashboard/welcome");
  };

  useEffect(() => {
    handleSidebarContent();
  }, []);

  return (
    <div>
      <div
        onClick={handleHome}
        className="d-flex gap-2 align-items-center justify-content-center mt-2 fw-bold p-2 mx-2 company-name"
      >
        <div className="bi bi-person-workspace"></div>
        {companyDetails ? (
          <div>{companyDetails.name}</div>
        ) : (
          <div>Create Company</div>
        )}
      </div>
      <hr />
      <div className="mt-3">
        {sidebarContent &&
          sidebarContent.map((item) => (
            <li
              key={item.id}
              className={`${
                activeItemDetails.sidebarActiveItem === item.id
                  ? "sidebar-item-active shadow"
                  : ""
              } sidebar-item d-flex gap-2 align-items-center justify-content-start ms-3 me-2 mt-2 p-2 rounded-2`}
              onClick={() => {
                handleActiveItem(item);
              }}
            >
              <div className={`${item.icon}`}></div>
              <div>{item.name}</div>
            </li>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
