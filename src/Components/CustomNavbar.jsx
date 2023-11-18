import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RiMenu2Fill } from "react-icons/ri";
import { activeData } from "../Store/activeSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companyData } from "../Store/companySlice";
import { userData } from "../Store/userSlice";
import { employeeData } from "../Store/employeeSlice";
import { projectData } from "../Store/projectSlice";
import { assignEmployeesList } from "../Store/assignEmployeesSlice";
import { activeProjectId } from "../Store/activeProject";

function CustomNavbar() {
  const userDetails = useSelector((state) => state.userData);
  const companyDetails = useSelector((state) => state.companyData);
  const sidebarStatus = useSelector((state) => state.activeItemData);

  let { leftSidebarActive } = sidebarStatus;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLinks = [
    {
      id: "#$dashboardAdmin",
      name: "Dashboard",
      icon: "bi bi-house-door-fill",
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
  ];

  const employeeLinks = [
    {
      id: "#$dashboardEmployee",
      name: "Dashboard",
      icon: "bi bi-house-door-fill",
    },
  ];

  const [links, setLinks] = useState([]);

  const handleLinks = () => {
    userDetails.userType === "Employee"
      ? setLinks(employeeLinks)
      : setLinks(adminLinks);
  };

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

  const handleAllProjects = () => {
    navigate("/auth/dashboard/projects");
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
    handleLinks();
  }, []);

  return (
    <Navbar sticky="top" expand="lg" className="background-color border-bottom">
      <Container fluid>
        <Navbar.Brand className="text-white">
          {companyDetails.name}
        </Navbar.Brand>
        <Nav>
          <RiMenu2Fill
            size={"20px"}
            onClick={sidebarToggleFromLeft}
            className={`${
              leftSidebarActive && "sidebarIcon-active"
            } d-none d-lg-block text-white`}
          />
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
            {links.length
              ? links.map((link) => {
                  return (
                    <Nav.Link
                      key={link.id}
                      onClick={() => {
                        handleActiveItem(link);
                      }}
                      className="d-lg-none text-white"
                    >
                      {link.name}
                    </Nav.Link>
                  );
                })
              : ""}
            <NavDropdown title="Customization" drop="start" autoClose="outside">
              {userDetails.userType === "Admin" ? (
                <>
                  <NavDropdown.Item
                    onClick={() => navigate("/auth/dashboard/createcompany")}
                  >
                    Edit Company Details
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item className="text-white">
                  Forget Password
                </NavDropdown.Item>
              )}
            </NavDropdown>
            <Nav.Link className="text-white" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
