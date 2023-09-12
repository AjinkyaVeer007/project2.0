import React from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { activeData } from "../../Store/activeSlice";

function Sidebar() {
  const dispatch = useDispatch();

  // get data from store
  const activeItemDetails = useSelector((state) => state.activeItemData);

  const sidebarArr = [
    {
      id: 1,
      name: "Create Company",
      icon: "bi bi-person-workspace",
    },
    {
      id: 2,
      name: "All Projects",
      icon: "bi bi-list-task",
    },
    {
      id: 3,
      name: "Logout",
      icon: "bi bi-box-arrow-left",
    },
  ];

  const handleActiveItem = (id) => {
    // dispatch active item id
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: id,
      })
    );
  };

  return (
    <div>
      <div className="d-flex gap-2 align-items-center justify-content-center mt-2 fw-bold p-2 mx-2 company-name">
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
                handleActiveItem(item.id);
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
