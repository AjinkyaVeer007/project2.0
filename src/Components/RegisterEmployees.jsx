import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EmployeeTable from "./EmployeeTable";
import { employeeData } from "../Store/employeeSlice";
import CustomButton from "./Buttons/CustomButton";
import { MdOutlineDataSaverOff } from "react-icons/md";

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
        userDetails?.userType === "Admin"
          ? userDetails?._id
          : userDetails?.adminId,
    };

    await axios
      .post(getEmployees_url, data)
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.users);
          dispatch(employeeData(res.data.users));
        }
      })
      .catch(() => {
        dispatch(employeeData([]));
      });
  };

  useEffect(() => {
    handleEmployeeList();
  }, []);

  return (
    <>
      <div className="row">
        <h5 className="mt-2 mb-3 fw-medium">Register Your Employees</h5>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <InputGroup.Text>Employee Name</InputGroup.Text>
            <Form.Control
              value={registerForm.name}
              name="name"
              onChange={handleForm}
              type="text"
              placeholder="Enter name"
            />
          </InputGroup>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <InputGroup.Text>Employee Email</InputGroup.Text>
            <Form.Control
              value={registerForm.email}
              name="email"
              onChange={handleForm}
              type="email"
              placeholder="Create email"
            />
          </InputGroup>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <InputGroup.Text>One Time Password</InputGroup.Text>
            <Form.Control
              value={registerForm.password}
              name="password"
              onChange={handleForm}
              type="text"
              placeholder="Enter One Time Password"
            />
          </InputGroup>
        </div>
        <div className="col-lg-6 col-12 col-md-6">
          <InputGroup className="p-2">
            <DropdownButton variant="outline-secondary" title="Select Post">
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
            </DropdownButton>
            <Form.Control
              value={dropdownValue}
              readOnly
              placeholder="Select Post"
            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <CustomButton
            name={"Save"}
            handleClick={handleEmployeeRegistration}
            bgColor={"secondary-bgcolor"}
            preIcon={<MdOutlineDataSaverOff size={"20px"} />}
          />
        </div>
      </div>
      {employeesDetails ? (
        <div className="row my-5">
          <EmployeeTable handleEmployeeList={handleEmployeeList} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default RegisterEmployees;
