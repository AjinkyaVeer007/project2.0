import React, { useId } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { activeData } from "../../Store/activeSlice";
import { useNavigate } from "react-router-dom";

function Sidebar({ setShowSidebarFromTop }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get data from store
  const activeItemDetails = useSelector((state) => state.activeItemData);

  const sidebarArr = [
    {
      id: useId(),
      name: "Create Company",
      icon: "bi bi-person-workspace",
    },
    {
      id: useId(),
      name: "Create Project",
      icon: "bi bi-clipboard-data",
    },
    {
      id: useId(),
      name: "All Projects",
      icon: "bi bi-list-task",
    },
    {
      id: useId(),
      name: "Logout",
      icon: "bi bi-box-arrow-left",
    },
  ];

  const handleActiveItem = (item) => {
    // dispatch active item id
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: item.id,
      })
    );
    setShowSidebarFromTop(false);
    switch (item.name) {
      case "Create Company":
        navigate("/auth/admin/dashboard/createcompany");
        break;
      case "All Projects":
        navigate("/auth/admin/dashboard/projects");
        break;
      case "Logout":
        dispatch(
          activeData({
            name: "sidebarActiveItem",
            value: null,
          })
        );
        navigate("/");
        break;
      default:
        break;
    }
  };

  const handleHome = () => {
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: null,
      })
    );
    setShowSidebarFromTop(false);
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
                  ? "sidebar-item-active"
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
