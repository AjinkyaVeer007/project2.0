import React from "react";
import "./TaskAllocation.css";

function TaskAllocation() {
  return (
    <div className="row">
      <div className="text-center">
        <button className="custom-btn rounded-2 mt-4">
          <div className="d-flex gap-2 align-items-center">
            <div className="bi bi-plus-circle"></div>
            <div>Allocate Task</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default TaskAllocation;
