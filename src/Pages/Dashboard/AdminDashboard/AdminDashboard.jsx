import React from "react";
import "./AdminDashboard.css";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import ComponentRouting from "../../../Routes/ComponentRouting";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { activeData } from "../../../Store/activeSlice";

function AdminDashboard() {
  const dispatch = useDispatch();

  // get data from redux store
  const sidebarStatus = useSelector((state) => state.activeItemData);
  const userDetails = useSelector((state) => state.userData);

  let { leftSidebarActive, topSidebarActive } = sidebarStatus;

  const sidebarToggleFromLeft = () => {
    if (leftSidebarActive) {
      dispatch(
        activeData({
          name: "leftSidebarActive",
          value: false,
        })
      );
    } else {
      dispatch(
        activeData({
          name: "leftSidebarActive",
          value: true,
        })
      );
    }
  };

  const sidebarToggleFromTop = () => {
    if (topSidebarActive) {
      dispatch(
        activeData({
          name: "topSidebarActive",
          value: false,
        })
      );
    } else {
      dispatch(
        activeData({
          name: "topSidebarActive",
          value: true,
        })
      );
    }
  };

  return (
    <div className="d-flex flex-lg-row flex-column position-relative">
      <div
        className={`sidebarLeft d-lg-block d-none ${
          leftSidebarActive ? "border-end" : ""
        }`}
        style={{ width: leftSidebarActive ? "18%" : "0%" }}
      >
        {leftSidebarActive && <Sidebar />}
      </div>
      {topSidebarActive && (
        <div
          className="sidebarTop border-bottom"
          style={{ height: topSidebarActive ? "max-content" : "" }}
        >
          <div
            onClick={sidebarToggleFromTop}
            className="bi bi-x-lg position-absolute top-0 left-0 m-2"
          ></div>
          {topSidebarActive && <Sidebar />}
        </div>
      )}
      <div className="herosection position-relative">
        <AiOutlineMenu
          onClick={sidebarToggleFromLeft}
          size={"30px"}
          className={`${
            leftSidebarActive && "sidebarIcon-active"
          } sidebarIcon position-absolute top-0 m-2 fs-5 start-0 bi bi-chevron-double-right d-none d-lg-block`}
        />
        {!topSidebarActive && (
          <AiOutlineMenu
            onClick={sidebarToggleFromTop}
            size={"30px"}
            className="sidebarIcon position-absolute top-0 start-0 m-2 bi bi-chevron-double-right d-lg-none"
          />
        )}
        <ComponentRouting />
      </div>
    </div>
  );
}

export default AdminDashboard;
