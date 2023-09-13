import React, { useState } from "react";
import "./AdminDashboard.css";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import ComponentRouting from "../../../Routes/ComponentRouting";

function AdminDashboard() {
  const [showSidebarFromLeft, setShowSidebarFromLeft] = useState(true);
  const [showSidebarFromTop, setShowSidebarFromTop] = useState(false);

  const sidebarToggleFromLeft = () => {
    if (showSidebarFromLeft) {
      setShowSidebarFromLeft(false);
    } else {
      setShowSidebarFromLeft(true);
    }
  };

  const sidebarToggleFromTop = () => {
    if (showSidebarFromTop) {
      setShowSidebarFromTop(false);
    } else {
      setShowSidebarFromTop(true);
    }
  };

  return (
    <div className="d-flex flex-lg-row flex-column position-relative">
      <div
        className={`sidebarLeft d-lg-block d-none ${
          showSidebarFromLeft ? "border-end" : ""
        }`}
        style={{ width: showSidebarFromLeft ? "18%" : "0%" }}
      >
        {showSidebarFromLeft && <Sidebar />}
      </div>
      {showSidebarFromTop && (
        <div
          className="sidebarTop border-bottom"
          style={{ height: showSidebarFromTop ? "100vh" : "" }}
        >
          <div
            onClick={() => {
              setShowSidebarFromTop(!showSidebarFromTop);
            }}
            className="bi bi-x-lg position-absolute top-0 left-0 m-2"
          ></div>
          {showSidebarFromTop && <Sidebar />}
        </div>
      )}
      <div className="herosection position-relative">
        <div
          onClick={sidebarToggleFromLeft}
          className={`${
            showSidebarFromLeft && "sidebarIcon-active"
          } sidebarIcon position-absolute top-0 fs-5 start-0 bi bi-chevron-double-right d-none d-lg-block`}
        ></div>
        <div
          onClick={sidebarToggleFromTop}
          className="position-absolute top-0 start-0 text-warning bi bi-chevron-double-right d-lg-none"
        ></div>
        <ComponentRouting />
      </div>
    </div>
  );
}

export default AdminDashboard;
