import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import CustomButton from "../../Buttons/CustomButton";
import { MdDataSaverOff } from "react-icons/md";

function SelfTaskAddAlert({ show, handleShow, handleSubmit }) {
  const [commit, setCommit] = useState("");

  const markasCompleted = () => {
    if (!commit.length) {
      return false;
    }
    handleSubmit(true, commit);
  };
  return (
    <Modal show={show} onHide={handleShow} size="lg">
      <Modal.Body>
        <h6 className="p-2">Add task with status completed?</h6>
        <InputGroup className="p-2">
          <Form.Control
            placeholder="Commit Link"
            value={commit}
            onChange={(e) => setCommit(e.target.value)}
          />
          <Button onClick={markasCompleted} variant="outline-danger">
            Submit
          </Button>
        </InputGroup>
        <div className="text-center">- or - </div>
        <div className="d-flex justify-content-center">
          <CustomButton
            handleClick={() => handleSubmit(true)}
            name={"Mark as completed without commit link"}
            bgColor={"secondary-bgcolor"}
            preIcon={<MdDataSaverOff size={"20px"} />}
          />
        </div>
        <div className="text-center">- or - </div>
        <div className="d-flex justify-content-center">
          <CustomButton
            handleClick={() => handleSubmit(false)}
            name={"Not Completed"}
            bgColor={"primary-bgcolor"}
            preIcon={<MdDataSaverOff size={"20px"} />}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SelfTaskAddAlert;
