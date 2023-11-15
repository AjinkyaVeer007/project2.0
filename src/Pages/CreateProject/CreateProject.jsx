import React, { Fragment, useEffect, useState } from "react";
import "./CreateProject.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjectTable from "../../Components/ProjectTable/ProjectTable";
import axios from "axios";
import { projectData } from "../../Store/projectSlice";
import {
  assignEmployeesList,
  handleAssign,
  handleRemoveAssign,
} from "../../Store/assignEmployeesSlice";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

function CreateProject() {
  const [dropdownValue, setDropdownValue] = useState("Select Priority");
  const [projectForm, setProjectForm] = useState({
    name: "",
    startDate: "",
    proposeEndDate: "",
  });

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);
  const employeesDetails = useSelector((state) => state.employeesData);
  const projectDetails = useSelector((state) => state.projectsData);
  const assignEmployeesDetails = useSelector(
    (state) => state.assignEmployeesData
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getProject_url = `${BASE_URL}getprojects`;
  const createProject_url = `${BASE_URL}createproject`;

  const getEmployeeList = () => {
    let employeeArr = [];
    let managerArr = [];
    for (let i = 0; i < employeesDetails?.employees?.length; i++) {
      let data = {
        name: employeesDetails.employees[i].name,
        email: employeesDetails.employees[i].email,
        id: employeesDetails.employees[i]._id,
        userType: employeesDetails.employees[i].userType,
        assign: false,
      };
      employeeArr.push(data);
    }
    for (let i = 0; i < employeesDetails?.managers?.length; i++) {
      let data = {
        name: employeesDetails.managers[i].name,
        email: employeesDetails.managers[i].email,
        id: employeesDetails.managers[i]._id,
        userType: employeesDetails.managers[i].userType,
        assign: false,
      };
      managerArr.push(data);
    }
    dispatch(
      assignEmployeesList({
        type: "assignEmployees",
        value: employeeArr,
      })
    );

    dispatch(
      assignEmployeesList({
        type: "assignManagers",
        value: managerArr,
      })
    );
  };

  const getProjects = async () => {
    const data = {
      userId: userDetails._id,
      userType: userDetails.userType,
    };

    await axios
      .post(getProject_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(projectData(res.data.projectData));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const createProject = async () => {
    let assignEmployeeslist = [];
    let assignManagersList = [];

    let employeeArr = assignEmployeesDetails.assignEmployees.filter(
      (employee) => {
        return employee.assign === true;
      }
    );

    for (let i = 0; i < employeeArr.length; i++) {
      assignEmployeeslist.push(employeeArr[i].id);
    }

    let managerArr = assignEmployeesDetails.assignManagers.filter((manager) => {
      return manager.assign === true;
    });

    for (let i = 0; i < managerArr.length; i++) {
      assignManagersList.push(managerArr[i].id);
    }

    const data = {
      name: projectForm.name,
      startDate: projectForm.startDate,
      proposeEndDate: projectForm.proposeEndDate,
      priority: dropdownValue === "Select Priority" ? "Medium" : dropdownValue,
      managersId: assignManagersList,
      employeesId: assignEmployeeslist,
      adminId: userDetails?.adminId ? userDetails?.adminId : userDetails?._id,
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
          getEmployeeList();
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
      projectForm.proposeEndDate.length
    ) {
      createProject();
    } else {
      notify("Must be fill mandatory fields", "info");
    }
  };

  useEffect(() => {
    getProjects();
    getEmployeeList();
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
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="text-white m-2 p-3"
            >
              Assign Managers
            </Dropdown.Toggle>
            {assignEmployeesDetails.assignManagers.length ? (
              <Dropdown.Menu>
                {assignEmployeesDetails?.assignManagers?.length &&
                  assignEmployeesDetails?.assignManagers.map((manager) => {
                    return (
                      <Fragment key={manager.id}>
                        {!manager.assign && (
                          <Dropdown.Item
                            onClick={() => {
                              dispatch(
                                handleAssign({
                                  type: "assignManagers",
                                  id: manager.id,
                                })
                              );
                            }}
                            key={manager.id}
                          >
                            {manager.name}
                          </Dropdown.Item>
                        )}
                      </Fragment>
                    );
                  })}
              </Dropdown.Menu>
            ) : (
              ""
            )}
          </Dropdown>
          {assignEmployeesDetails.assignManagers.length ? (
            <div className="row m-2">
              {assignEmployeesDetails?.assignManagers?.length &&
                assignEmployeesDetails.assignManagers.map((manager) => {
                  return (
                    <Fragment key={manager.id}>
                      {manager.assign && (
                        <>
                          <div className="col-10 p-1">{manager.name}</div>
                          <div className="col-2 p-1 text-danger">
                            <MdDelete
                              size={"20px"}
                              onClick={() => {
                                dispatch(
                                  handleRemoveAssign({
                                    type: "assignManagers",
                                    id: manager.id,
                                  })
                                );
                              }}
                            />
                          </div>
                          <hr />
                        </>
                      )}
                    </Fragment>
                  );
                })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="text-white m-2 p-3"
            >
              *Assign Employees
            </Dropdown.Toggle>

            {assignEmployeesDetails.assignEmployees.length ? (
              <Dropdown.Menu>
                {assignEmployeesDetails?.assignEmployees?.length &&
                  assignEmployeesDetails?.assignEmployees.map((employee) => {
                    return (
                      <Fragment key={employee.id}>
                        {!employee.assign && (
                          <Dropdown.Item
                            onClick={() => {
                              dispatch(
                                handleAssign({
                                  type: "assignEmployees",
                                  id: employee.id,
                                })
                              );
                            }}
                            key={employee.id}
                          >
                            {employee.name}
                          </Dropdown.Item>
                        )}
                      </Fragment>
                    );
                  })}
              </Dropdown.Menu>
            ) : (
              ""
            )}
          </Dropdown>
          {assignEmployeesDetails.assignEmployees.length ? (
            <div className="row m-2">
              {assignEmployeesDetails?.assignEmployees?.length &&
                assignEmployeesDetails.assignEmployees.map((employee) => {
                  return (
                    <Fragment key={employee.id}>
                      {employee.assign && (
                        <>
                          <div className="col-10 p-1">{employee.name}</div>
                          <div className="col-2 p-1 text-danger">
                            <MdDelete
                              size={"20px"}
                              onClick={() => {
                                dispatch(
                                  handleRemoveAssign({
                                    type: "assignEmployees",
                                    id: employee.id,
                                  })
                                );
                              }}
                            />
                          </div>
                          <hr />
                        </>
                      )}
                    </Fragment>
                  );
                })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="text-center mb-4">
          <button
            className="custom-btn rounded-2 mt-4"
            onClick={handleCreateProject}
          >
            Create
          </button>
        </div>
        {projectDetails.length ? (
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
