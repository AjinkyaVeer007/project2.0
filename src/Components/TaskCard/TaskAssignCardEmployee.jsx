import React, { Fragment, useState } from "react";
import "./TaskAssignCard.css";
import TaskModal from "../Modals/TaskModal";

function TaskAssignCardEmployee({ taskList, getTasks }) {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const handleShowModal = (task) => {
    setData(task);
    setShowModal(!showModal);
  };

  return (
    <div className="col-12 col-lg-4 col-md-6">
      <div className="rounded border taskCard p-3 m-2 d-flex flex-column">
        <div className="taskContainer customscrollbar">
          <div className="row align-items-center">
            {taskList.length ? (
              taskList.map((task) => {
                return (
                  <Fragment key={task._id}>
                    <div className="col-1 mb-2 cursor-pointer">
                      <div
                        className={`taskCircle ${
                          task.isCompleted ? "taskCompleted" : "taskOngoing"
                        }`}
                      ></div>
                    </div>
                    <div className="col-10 mb-2 cursor-pointer">
                      <a
                        href={task.commit}
                        target="_blank"
                        className={`${
                          task.isCompleted && "text-decoration-line-through"
                        } taskName`}
                      >
                        {task.task}
                      </a>
                    </div>
                    <div
                      onClick={() => handleShowModal(task)}
                      className="col-1 mb-2 cursor-pointer"
                    >
                      <div className="bi bi-link text-success fs-5"></div>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <>
                <div className="col-1 mb-2 cursor-pointer">
                  <div className="taskCircle taskOngoing"></div>
                </div>
                <div className="col-11 mb-2 cursor-pointer">
                  <h6 className="text-danger">No Task Assign</h6>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <TaskModal
        getTasks={getTasks}
        taskDetails={data}
        show={showModal}
        handleShow={handleShowModal}
      />
    </div>
  );
}

export default TaskAssignCardEmployee;
