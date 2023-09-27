import React from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { activeData } from "../../Store/activeSlice";
import { userData } from "../../Store/userSlice";
import { useNavigate } from "react-router-dom";

function Sidebar({ setShowSidebarFromTop }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get data from store
  const activeItemDetails = useSelector((state) => state.activeItemData);

  const sidebarArr = [
    {
      id: "#$dashboard",
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
    switch (item.name) {
      case "Dashboard":
        navigate("/auth/admin/dashboard/welcome");
        break;
      case "Create Company":
        navigate("/auth/admin/dashboard/createcompany");
        break;
      case "All Projects":
        handleAllProjects();
        break;
      case "Create Project":
        navigate("/auth/admin/dashboard/createproject");
        break;
      case "Logout":
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
    dispatch(
      userData({
        name: "companyData",
        value: null,
      })
    );
    dispatch(
      userData({
        name: "employeesList",
        value: [],
      })
    );
    dispatch(
      userData({
        name: "projectList",
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

  return (
    <div>
      <div
        onClick={handleHome}
        className="d-flex gap-2 align-items-center justify-content-center mt-2 fw-bold p-2 mx-2 company-name"
      >
        <div className="bi bi-person-workspace"></div>
        <div>Company name</div>
      </div>
      <hr />
      <div className="mt-3">
        {sidebarArr &&
          sidebarArr.map((item) => (
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
