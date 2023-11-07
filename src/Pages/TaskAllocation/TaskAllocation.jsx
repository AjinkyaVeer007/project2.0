import React, { useState } from "react";
import "./TaskAllocation.css";
import TaskModal from "../../Components/Modals/TaskModal/TaskModal";

function TaskAllocation() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);
  return (
    <div className="row">
      <div className="col-12 text-center">
        <button onClick={handleShow} className="custom-btn rounded-2 mt-4">
          <div className="d-flex gap-2 align-items-center">
            <div className="bi bi-plus-circle"></div>
            <div>Allocate Task</div>
          </div>
        </button>
      </div>
      <TaskModal show={show} handleShow={handleShow} />
    </div>
  );
}

export default TaskAllocation;
