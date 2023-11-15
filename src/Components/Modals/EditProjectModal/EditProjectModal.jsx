import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { MdDelete } from "react-icons/md";
import {
  assignEmployeesList,
  handleAssign,
  handleRemoveAssign,
} from "../../../Store/assignEmployeesSlice";

function EditProjectModal({ handleShow, show, getProjects }) {
  const dispatch = useDispatch();
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 1000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);
  const projectDetails = useSelector((state) => state.projectModalData);
  const employeesDetails = useSelector((state) => state.employeesData);
  const assignEmployeesDetails = useSelector(
    (state) => state.assignEmployeesData
  );

  const [editForm, setEditForm] = useState({
    name: "",
    startDate: "",
    proposeEndDate: "",
  });
  const [dropdownValue, setDropdownValue] = useState("Select Priority");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeList = () => {
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

  const handleSelectedEmployees = () => {
    handleEmployeeList();
    if (projectDetails?.managers.length) {
      for (let i = 0; i < projectDetails.managers.length; i++) {
        dispatch(
          handleAssign({
            type: "assignManagers",
            id: projectDetails.managers[i]._id,
          })
        );
      }
    }
    for (let i = 0; i < projectDetails?.employees?.length; i++) {
      dispatch(
        handleAssign({
          type: "assignEmployees",
          id: projectDetails?.employees[i]._id,
        })
      );
    }
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const editProject_url = `${BASE_URL}updateprojectdetails/${projectDetails?._id}`;

  const handleEdit = async () => {
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
      name: editForm.name,
      startDate: editForm.startDate,
      proposeEndDate: editForm.proposeEndDate,
      priority: dropdownValue === "Select Priority" ? "Medium" : dropdownValue,
      managersId: assignManagersList,
      employeesId: assignEmployeeslist,
      adminId: userDetails?.adminId ? userDetails?.adminId : userDetails?._id,
    };

    await axios
      .put(editProject_url, data)
      .then((res) => {
        if (res.data.status) {
          handleShow();
          getProjects();
          notify("Project edited successfully", "success");
        }
      })
      .catch((err) => {
        notify(err.response.data, "error");
        console.log(err);
      });
  };

  useEffect(() => {
    setEditForm((prev) => ({
      ...prev,
      name: projectDetails?.name,
      startDate: projectDetails?.startDate,
      proposeEndDate: projectDetails?.proposeEndDate,
    }));
    setDropdownValue(projectDetails?.priority);
    if (show) {
      handleSelectedEmployees();
    } else {
      handleEmployeeList();
    }
  }, [show]);
  return (
    <Modal show={show} onHide={handleShow} size="lg">
      <Modal.Body>
        <div className="row">
          <div className="col-lg-6 col-12 col-md-6">
            <FloatingLabel
              controlId="floatingInput"
              label="* Project Name"
              className="m-2"
            >
              <Form.Control
                value={editForm.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="name"
              />
            </FloatingLabel>
          </div>
          <div className="col-lg-6 col-12 col-md-6 d-flex align-items-center justify-content-start">
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
            <FloatingLabel
              controlId="floatingInput"
              label="* Start Date"
              className="m-2"
            >
              <Form.Control
                name="startDate"
                type="date"
                placeholder="* start date"
                value={editForm.startDate}
                onChange={handleChange}
              />
            </FloatingLabel>
          </div>
          <div className="col-lg-6 col-12 col-md-6">
            <FloatingLabel
              controlId="floatingInput"
              label="* Proposed End Date"
              className="m-2"
            >
              <Form.Control
                name="proposeEndDate"
                type="date"
                placeholder="* propose end date"
                value={editForm.proposeEndDate}
                onChange={handleChange}
              />
            </FloatingLabel>
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
            </Dropdown>
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
          </div>
          <div className="col-lg-6 col-12 col-md-6">
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="text-white m-2 p-3"
              >
                Assign Employees
              </Dropdown.Toggle>

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
            </Dropdown>
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
          </div>
        </div>
        <div className="text-center mt-2">
          <button className="custom-btn rounded-2" onClick={handleEdit}>
            Update
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditProjectModal;
