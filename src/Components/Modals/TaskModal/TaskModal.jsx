import React from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

function TaskModal({ show, handleShow }) {
  return (
    <Modal show={show} onHide={handleShow} size="lg">
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <Dropdown>
              <Dropdown.Toggle
                variant="warning"
                id="dropdown-basic"
                className="text-white m-2 p-3"
              >
                Select Employee
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Manager</Dropdown.Item>
                <Dropdown.Item>Employee</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-9">
            <FloatingLabel controlId="floatingInput" label="Enter Task">
              <Form.Control type="text" name="name" placeholder="Enter Task" />
            </FloatingLabel>
          </div>
          <div className="col-2 mt-auto m-2">
            <button className="custom-btn rounded">Add</button>
          </div>
        </div>
        <div className="col-12">
          <Table responsive>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Create Dashboard Card</td>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <MdModeEditOutline size={"20px"} color="#44ce42" />
                    <MdDelete size={"20px"} color="tomato" />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
