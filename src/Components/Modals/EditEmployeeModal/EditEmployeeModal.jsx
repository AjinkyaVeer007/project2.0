import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { MdInfo } from "react-icons/md";
import CustomButton from "../../Buttons/CustomButton";
import { IoMdDoneAll } from "react-icons/io";

function EditEmployeeModal({ handleShow, show, data, handleEmployeeList }) {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 1000, theme: "colored", type: type });

  const [editForm, setEditForm] = useState({
    name: data?.name || "",
    email: data?.email || "",
    defaultPassword: "",
  });
  const [dropdownValue, setDropdownValue] = useState(
    data?.userType || "Select Post"
  );
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
    setIsDisable(false);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const editEmployee_url = `${BASE_URL}updateemployeedetails/${data?._id}`;

  const handleEdit = async () => {
    if (!isDisable) {
      if (editForm.name.length && editForm.email && editForm.defaultPassword) {
        const employeeData = {
          name: editForm.name,
          email: editForm.email,
          password: editForm.defaultPassword,
          userType: dropdownValue,
          isPasswordChange: false,
          defaultPassword: editForm.defaultPassword,
        };

        await axios
          .put(editEmployee_url, employeeData)
          .then((res) => {
            if (res.data.status) {
              handleShow();
              handleEmployeeList();
              notify("User edited successfully", "success");
            }
          })
          .catch((err) => {
            notify(err?.response.data, "error");
          });
      } else {
        notify("All fields are mandatory", "error");
      }
    } else {
      notify("No change detected", "info");
    }
  };

  useEffect(() => {
    setEditForm({
      name: data?.name || "",
      email: data?.email || "",
      defaultPassword: "",
    });
    setDropdownValue(data?.userType || "Select Post");
  }, [data]);

  return (
    <Modal show={show} onHide={handleShow} size="lg">
      <Modal.Body>
        <div className="row">
          <div className="col-12 col-lg-4 col-xl-4">
            <FloatingLabel
              controlId="floatingInput"
              label="Employee Name"
              className="m-2"
            >
              <Form.Control
                type="text"
                name="name"
                placeholder="Employee name"
                value={editForm.name}
                onChange={handleChange}
              />
            </FloatingLabel>
          </div>
          <div className="col-12 col-lg-4 col-xl-4">
            <FloatingLabel
              controlId="floatingInput"
              label="Employee Email"
              className="m-2"
            >
              <Form.Control
                value={editForm.email}
                type="email"
                name="email"
                placeholder="Employee Email"
                onChange={handleChange}
              />
            </FloatingLabel>
          </div>
          <div className="col-12 col-lg-4 col-xl-4">
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
          <div className="col-12 mt-4 ms-2">
            <div className="text-secondary d-flex gap-2 align-items-center">
              <div>
                <MdInfo />
              </div>
              <div>
                You need to set again one time password if you are updating any
                details.
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-6">
            <FloatingLabel
              controlId="floatingInput"
              label="One Time Password"
              className="m-2"
            >
              <Form.Control
                type="text"
                name="defaultPassword"
                placeholder="One Time Password"
                value={editForm.defaultPassword}
                onChange={handleChange}
              />
            </FloatingLabel>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <CustomButton
            name={"Update"}
            handleClick={handleEdit}
            bgColor={"secondary-bgcolor"}
            preIcon={<IoMdDoneAll size={"20px"} />}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditEmployeeModal;
