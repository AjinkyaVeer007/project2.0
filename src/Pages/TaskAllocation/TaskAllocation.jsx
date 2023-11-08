import React from "react";
import "./TaskAllocation.css";
import TaskCard from "../../Components/TaskCard/TaskCard";

function TaskAllocation() {
  return (
    <div className="row mt-5">
        <div className="container">
          <div className="row">
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
    </div>
  );
}

export default TaskAllocation;
