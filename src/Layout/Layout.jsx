import React from "react";
import Sidebar from "../Components/Sidebar";
import ComponentRouting from "../Routes/ComponentRouting";
import { useSelector, useDispatch } from "react-redux";
import CustomNavbar from "../Components/CustomNavbar";

function Layout() {
  const dispatch = useDispatch();

  // get data from redux store
  const sidebarStatus = useSelector((state) => state.activeItemData);

  let { leftSidebarActive } = sidebarStatus;

  return (
    <div className="main-container">
      <CustomNavbar />
      <div className="d-flex flex-lg-row flex-column position-relative">
        <div
          className={`sidebarLeft pt-2 d-lg-block d-none ${
            leftSidebarActive ? "background-color rounded m-2" : ""
          }`}
          style={{ width: leftSidebarActive ? "18%" : "0%" }}
        >
          {leftSidebarActive && <Sidebar />}
        </div>
        <div className="herosection customscrollbar position-relative">
          <ComponentRouting />
        </div>
      </div>
    </div>
  );
}

export default Layout;
