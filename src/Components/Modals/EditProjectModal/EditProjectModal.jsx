import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import MultiSelectDropdown from "../../MultiSelectDropdown/MultiSelectDropdown";

function EditProjectModal({ handleShow, show, getProjects, data }) {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 1000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);

  const [editForm, setEditForm] = useState({
    name: data?.name,
    startDate: data?.startDate,
    proposeEndDate: data?.proposeEndDate,
  });
  const [dropdownValue, setDropdownValue] = useState(
    data?.priority || "Select Priority"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const editCompany_url = `${BASE_URL}updatecompanydetails/${userDetails.companyData?._id}`;

  const handleEdit = async () => {};

  useEffect(() => {
    setEditForm({
      name: data?.name,
      startDate: data?.startDate,
      proposeEndDate: data?.proposeEndDate,
    });
    setDropdownValue(data?.priority || "Select Priority");
  }, [data]);

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
            <MultiSelectDropdown
              employeeData={[]}
              placeholderName={"Assign Manager"}
              handleSelectedInfo={[]}
              isEmpty={false}
            />
          </div>
          <div className="col-lg-6 col-12 col-md-6">
            <MultiSelectDropdown
              employeeData={[]}
              placeholderName={"* Assign Employee"}
              handleSelectedInfo={[]}
              isEmpty={false}
            />
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
