import React, { useState } from "react";
import "./Company.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import EmployeeTable from "../../Components/EmployeeTable/EmployeeTable";

function Company() {
  const [dropdownValue, setDropdownValue] = useState("Select Post");

  return (
    <div className="row mt-5 mx-2">
      <div className="col-12 mb-4">
        <div className="text-center fs-5 mb-2 company-headingText">
          Register Your Company
        </div>
        <div className="d-flex flex-wrap justify-content-start align-items-center mx-3 gap-2">
          <FloatingLabel
            controlId="floatingInput"
            label="Company Name"
            className="flex-grow-1"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <div>
            <button className="custom-btn rounded-2">Save</button>
          </div>
        </div>
      </div>
      <hr />
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
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="Employee Email"
            className="m-2"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4">
          <FloatingLabel
            controlId="floatingInput"
            label="Employee Password"
            className="m-2"
          >
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
        </div>
        <div className="col-lg-3 col-12 col-md-4 d-flex align-items-center justify-content-start">
          <Dropdown>
            <Dropdown.Toggle
              variant="warning"
              id="dropdown-basic"
              className="text-white"
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
          <button className="custom-btn rounded-2 mt-4">Save</button>
        </div>
      </div>
      <div className="row mt-5">
        <EmployeeTable />
      </div>
    </div>
  );
}

export default Company;
