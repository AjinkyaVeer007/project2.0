import React, { useState } from "react";
import "./CreateProject.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import MultiSelectDropdown from "../../Components/MultiSelectDropdown/MultiSelectDropdown";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeData } from "../../Store/activeSlice";

function CreateProject() {
  const [dropdownValue, setDropdownValue] = useState("Select Priority");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   Managerlist
  const managerList = [
    { value: "rushikesh", label: "rushi@gmail.com" },
    { value: "ajinkya", label: "ajinkya@gmail.com" },
    { value: "omkar", label: "omkar@gmail.com" },
  ];

  //   Employeelist
  const employeeList = [
    { value: "rushikesh", label: "rushi@gmail.com" },
    { value: "ajinkya", label: "ajinkya@gmail.com" },
    { value: "omkar", label: "omkar@gmail.com" },
  ];

  const handleNavigation = () => {
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: "#$allproject",
      })
    );
    navigate("/auth/admin/dashboard/projects");
  };

  return (
    <div className="row mt-5">
      <div className="text-center fs-5 mb-2 company-headingText">
        Create Your Project
      </div>
      <div className="col-lg-3 col-12 col-md-4">
        <FloatingLabel
          controlId="floatingInput"
          label="Project Name"
          className="m-2"
        >
          <Form.Control type="text" placeholder="name@example.com" />
        </FloatingLabel>
      </div>
      <div className="col-lg-3 col-12 col-md-4">
        <FloatingLabel
          controlId="floatingInput"
          label="Start Date"
          className="m-2"
        >
          <Form.Control type="date" placeholder="name@example.com" />
        </FloatingLabel>
      </div>
      <div className="col-lg-3 col-12 col-md-4">
        <FloatingLabel
          controlId="floatingInput"
          label="Proposed End Date"
          className="m-2"
        >
          <Form.Control type="date" placeholder="name@example.com" />
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
      <div className="col-lg-5 col-12 col-md-6">
        <MultiSelectDropdown
          employeeData={managerList}
          placeholderName={"Assign Manager"}
        />
      </div>
      <div className="col-lg-5 col-12 col-md-6">
        <MultiSelectDropdown
          employeeData={employeeList}
          placeholderName={"Assign Employee"}
        />
      </div>
      <div className="text-center">
        <button className="custom-btn rounded-2 mt-4">Create</button>
      </div>
      <div
        onClick={handleNavigation}
        className="viewProjectText position-absolute bottom-0 end-0 w-auto m-2"
      >
        <div className="d-flex align-items-center gap-2">
          <div>View Project</div>
          <BsArrowRight />
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
