import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function TaskModal({ show, handleShow, taskDetails, getTasks }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const notify = (notification, type) =>
    toast(notification, { autoClose: 1000, theme: "colored", type: type });

  const [commit, setCommit] = useState(
    taskDetails?.commit ? taskDetails?.commit : ""
  );

  const updateTask_url = BASE_URL + `updatetask/${taskDetails?._id}`;

  const handleUpdate = async (data) => {
    await axios
      .put(updateTask_url, data)
      .then((res) => {
        if (res.data.status) {
          setCommit("");
          getTasks();
          handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitTaskWithCommit = () => {
    const data = {
      commit: commit,
      isCompleted: true,
    };
    handleUpdate(data);
  };

  const sumbitTaskWithoutCommit = () => {
    const data = {
      commit: null,
      isCompleted: true,
    };
    handleUpdate(data);
  };

  const makeTaskUncomplete = () => {
    const data = {
      commit: null,
      isCompleted: false,
    };
    handleUpdate(data);
  };

  return (
    <Modal show={show} onHide={handleShow} size="md">
      <Modal.Header>
        <Modal.Title className="fs-6">
          Add commit link once task completed.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Commit Link"
            value={commit}
            onChange={(e) => setCommit(e.target.value)}
          />
          <Button onClick={submitTaskWithCommit} variant="outline-secondary">
            Submit
          </Button>
        </InputGroup>
        <div className="text-center">- or -</div>
        <div className="text-center">
          <button
            onClick={sumbitTaskWithoutCommit}
            className="custom-btn rounded-2"
          >
            Make Task Complete without commit
          </button>
        </div>
        <div className="text-center">- or -</div>
        <div className="text-center">
          <button onClick={makeTaskUncomplete} className="custom-btn rounded-2">
            Make Task Uncomplete
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
