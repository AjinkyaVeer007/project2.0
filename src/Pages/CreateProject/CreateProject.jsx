import React, { useEffect, useState } from "react";
import "./CreateProject.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import MultiSelectDropdown from "../../Components/MultiSelectDropdown/MultiSelectDropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjectTable from "../../Components/ProjectTable/ProjectTable";
import axios from "axios";
import { userData } from "../../Store/userSlice";
import { toast } from "react-toastify";
import EditProjectModal from "../../Components/Modals/EditProjectModal/EditProjectModal";

function CreateProject() {
  const [dropdownValue, setDropdownValue] = useState("Select Priority");
  const [managerlist, setManagerlist] = useState([]);
  const [employeelist, setEmployeelist] = useState([]);
  const [assignEmployees, setAssignEmployees] = useState([]);
  const [assignManagers, setAssignManagers] = useState([]);
  const [projectForm, setProjectForm] = useState({
    name: "",
    startDate: "",
    proposeEndDate: "",
  });
  const [isEmpty, setIsEmpty] = useState(false);

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getProject_url = `${BASE_URL}getprojects`;
  const getEmployees_url = `${BASE_URL}getemployees`;
  const createProject_url = `${BASE_URL}createproject`;

  const handleEmployeeList = async () => {
    const data = {
      adminId:
        userDetails.userData.userType === "admin"
          ? userDetails.userData._id
          : userDetails.userData.adminId,
    };

    await axios
      .post(getEmployees_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(
            userData({
              name: "employeesList",
              value: res.data.users,
            })
          );
          getEmployeeList();
        }
      })
      .catch(() => {
        dispatch(
          userData({
            name: "employeesList",
            value: [],
          })
        );
      });
  };

  const getEmployeeList = () => {
    setEmployeelist([]);
    setManagerlist([]);
    const employees = userDetails.employeesList.filter((user) => {
      return user.userType === "Employee";
    });
    for (let i = 0; i < employees.length; i++) {
      let data = {
        value: {
          name: employees[i].name,
          email: employees[i].email,
          id: employees[i]._id,
          userType: employees[i].userType,
        },
        label: employees[i].email,
      };
      setEmployeelist((prev) => [...prev, data]);
    }
    const managers = userDetails.employeesList.filter((user) => {
      return user.userType === "Manager";
    });
    for (let i = 0; i < managers.length; i++) {
      let data = {
        value: {
          name: managers[i].name,
          email: managers[i].email,
          id: managers[i]._id,
          userType: managers[i].userType,
        },
        label: managers[i].email,
      };
      setManagerlist((prev) => [...prev, data]);
    }
  };

  const getProjects = async () => {
    const data = {
      adminId:
        userDetails.userData.userType === "admin"
          ? userDetails.userData._id
          : userDetails.userData.adminId,
    };

    await axios
      .post(getProject_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(
            userData({
              name: "projectList",
              value: res.data.projectData,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectedManagers = (data) => {
    setAssignManagers([]);
    for (let i = 0; i < data.length; i++) {
      setAssignManagers((prev) => [...prev, data[i].value]);
    }
  };

  const handleSelectedEmployees = (data) => {
    setAssignEmployees([]);
    for (let i = 0; i < data.length; i++) {
      setAssignEmployees((prev) => [...prev, data[i].value]);
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const createProject = async () => {
    const data = {
      name: projectForm.name,
      startDate: projectForm.startDate,
      proposeEndDate: projectForm.proposeEndDate,
      priority: dropdownValue === "Select Priority" ? "Medium" : dropdownValue,
      managers: assignManagers.length ? assignManagers : null,
      employees: assignEmployees,
      adminId: userDetails.userData.adminId
        ? userDetails.userData.adminId
        : userDetails.userData._id,
    };

    await axios
      .post(createProject_url, data)
      .then((res) => {
        if (res.data.status) {
          notify(res.data.message, "success");
          setProjectForm({
            name: "",
            startDate: "",
            proposeEndDate: "",
          });
          setDropdownValue("Select Priority");
          setIsEmpty(true);
          getProjects();
        }
      })
      .catch((err) => {
        notify(err.response.data, "error");
        console.log(err);
      });
  };

  const handleCreateProject = () => {
    if (
      projectForm.name.length &&
      projectForm.startDate.length &&
      projectForm.proposeEndDate.length &&
      assignEmployees.length
    ) {
      createProject();
    } else {
      notify("Must be fill mandatory fields", "info");
    }
  };

  useEffect(() => {
    getProjects();
    handleEmployeeList();
  }, []);

  return (
    <>
      <div className="row mt-5">
        <div className="text-center fs-5 mb-2 company-headingText">
          Create Your Project
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="* Project Name"
            className="m-2"
          >
            <Form.Control
              value={projectForm.name}
              onChange={handleForm}
              name="name"
              type="text"
              placeholder="name"
            />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="* Start Date"
            className="m-2"
          >
            <Form.Control
              value={projectForm.startDate}
              onChange={handleForm}
              name="startDate"
              type="date"
              placeholder="* start date"
            />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="* Proposed End Date"
            className="m-2"
          >
            <Form.Control
              value={projectForm.proposeEndDate}
              onChange={handleForm}
              name="proposeEndDate"
              type="date"
              placeholder="* propose end date"
            />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4 d-flex align-items-center justify-content-start">
          <Dropdown>
            <Dropdown.Toggle
              variant="warning"
              id="dropdown-basic"
              className="text-white m-2 p-3"
            >
              {dropdownValue}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue("High");
                }}
              >
                High
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue("Medium");
                }}
              >
                Medium
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue("Moderate");
                }}
              >
                Moderate
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <MultiSelectDropdown
            employeeData={managerlist}
            placeholderName={"Assign Manager"}
            handleSelectedInfo={handleSelectedManagers}
            isEmpty={isEmpty}
          />
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <MultiSelectDropdown
            employeeData={employeelist}
            placeholderName={"* Assign Employee"}
            handleSelectedInfo={handleSelectedEmployees}
            isEmpty={isEmpty}
          />
        </div>
        <div className="text-center mb-4">
          <button
            className="custom-btn rounded-2 mt-4"
            onClick={handleCreateProject}
          >
            Create
          </button>
        </div>
        {userDetails.projectList.length ? (
          <>
            <hr />
            <ProjectTable getProjects={getProjects} />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CreateProject;
