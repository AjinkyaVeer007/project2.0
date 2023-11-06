import React, { useEffect, useState } from "react";
import "./RegisterEmployees.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import { userData } from "../../Store/userSlice";
import { employeeData } from "../../Store/employeeSlice";

function RegisterEmployees() {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [dropdownValue, setDropdownValue] = useState("Select Post");

  const handleForm = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const userDetails = useSelector((state) => state.userData);
  const employeesDetails = useSelector((state) => state.employeesData);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const register_Url = `${BASE_URL}register`;
  const getEmployees_url = `${BASE_URL}getemployees`;

  const handleEmployeeRegistration = async () => {
    if (
      registerForm.name.length &&
      registerForm.email.length &&
      registerForm.password.length
    ) {
      const data = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        userType: dropdownValue === "Select Post" ? "Employee" : dropdownValue,
        adminId: userDetails.adminId || userDetails._id,
        isPasswordChange: false,
        defaultPassword: registerForm.password,
      };
      await axios
        .post(register_Url, data)
        .then((res) => {
          if (res.data.status) {
            notify("User registered successfully", "success");
            setRegisterForm({
              name: "",
              email: "",
              password: "",
            });
            setDropdownValue("Select Post");
            handleEmployeeList();
          }
        })
        .catch((err) => {
          console.log(err);
          notify(err.response.data, "error");
        });
    } else {
      notify("All fields are mandatory", "info");
    }
  };

  const handleEmployeeList = async () => {
    const data = {
      adminId:
        userDetails?.userType === "admin"
          ? userDetails?._id
          : userDetails?.adminId,
    };

    await axios
      .post(getEmployees_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(employeeData(res.data.users));
        }
      })
      .catch(() => {
        dispatch(userData([]));
      });
  };

  useEffect(() => {
    handleEmployeeList();
  }, []);

  return (
    <>
      <div className="row">
        <div className="text-center fs-5 mb-2 company-headingText">
          Register Your Employees
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="Employee Name"
            className="m-2"
          >
            <Form.Control
              value={registerForm.name}
              name="name"
              onChange={handleForm}
              type="text"
              placeholder="name"
            />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="Employee Email"
            className="m-2"
          >
            <Form.Control
              value={registerForm.email}
              name="email"
              onChange={handleForm}
              type="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="One Time Password"
            className="m-2"
          >
            <Form.Control
              value={registerForm.password}
              name="password"
              onChange={handleForm}
              type="text"
              placeholder="name@example.com"
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
                  setDropdownValue("Manager");
                }}
              >
                Manager
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setDropdownValue("Employee");
                }}
              >
                Employee
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="text-center">
          <button
            className="custom-btn rounded-2 mt-4"
            onClick={handleEmployeeRegistration}
          >
            Save
          </button>
        </div>
      </div>
      {employeesDetails?.employees?.length ? (
        <div className="row mt-5">
          <EmployeeTable handleEmployeeList={handleEmployeeList} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default RegisterEmployees;
