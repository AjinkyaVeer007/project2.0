import React from "react";
import "./TaskCard.css";

function TaskCard() {
  return (
    <div className="col-12 col-lg-4 col-md-6">
      <div className="rounded border taskCard p-3 m-2 d-flex flex-column">
        <div>
          <h6 className="taskUser">Rushikesh</h6>
          <div className="border-bottom my-3"></div>
          <div className="taskContainer customscrollbar">
            <div className="row align-items-center">
              <div className="col-1 mb-2 cursor-pointer">
                <div className="taskCircle taskCompleted"></div>
              </div>
              <div className="col-11 mb-2 cursor-pointer">
                <h6 className="text-decoration-line-through taskName">
                  Create Navbar
                </h6>
              </div>
              <div className="col-1 mb-2 cursor-pointer">
                <div className="taskCircle taskOngoing"></div>
              </div>
              <div className="col-11 mb-2 cursor-pointer">
                <h6 className="taskName">Create Sidebar</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="rounded border p-1 d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control taskInputBox"
              placeholder="Enter Task"
            />
            <button className="custom-btn rounded">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
