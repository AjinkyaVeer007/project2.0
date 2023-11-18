import React, { Fragment, useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjectTable from "../Components/ProjectTable";
import axios from "axios";
import { projectData } from "../Store/projectSlice";
import { DropdownButton } from "react-bootstrap";
import {
  assignEmployeesList,
  handleAssign,
  handleRemoveAssign,
} from "../Store/assignEmployeesSlice";
import { toast } from "react-toastify";
import { MdDelete, MdOutlineDataSaverOff } from "react-icons/md";
import InputGroup from "react-bootstrap/InputGroup";
import CustomButton from "../Components/Buttons/CustomButton";

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
      <div className="row mt-2 mb-4 mx-2 border rounded p-2 p-lg-3 bg-white">
        <h5 className="mt-2 mb-3 fw-medium">Create Your Project</h5>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <InputGroup.Text>* Project Name</InputGroup.Text>
            <Form.Control
              value={projectForm.name}
              onChange={handleForm}
              name="name"
              type="text"
              placeholder="Enter project name"
            />
          </InputGroup>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <DropdownButton variant="outline-secondary" title="Select Post">
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue("High");
                }}
              >
                High
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue("Moderate");
                }}
              >
                Moderate
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue("Low");
                }}
              >
                Low
              </Dropdown.Item>
            </DropdownButton>
            <Form.Control
              value={dropdownValue}
              readOnly
              placeholder="Select Project Priority"
            />
          </InputGroup>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <InputGroup.Text>* Start Date</InputGroup.Text>
            <Form.Control
              value={projectForm.startDate}
              onChange={handleForm}
              name="startDate"
              type="date"
              placeholder="* start date"
            />
          </InputGroup>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <InputGroup.Text>* Proposed End Date</InputGroup.Text>
            <Form.Control
              value={projectForm.proposeEndDate}
              onChange={handleForm}
              name="proposeEndDate"
              type="date"
              placeholder="* propose end date"
            />
          </InputGroup>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              size="sm"
              id="dropdown-basic"
              className="text-white m-2 p-2"
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
              className="text-white m-2 p-2"
              size="sm"
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
        <div className="d-flex justify-content-center mb-4">
          <CustomButton
            name={"Create"}
            handleClick={handleCreateProject}
            bgColor={"secondary-bgcolor"}
            preIcon={<MdOutlineDataSaverOff size={"20px"} />}
          />
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
