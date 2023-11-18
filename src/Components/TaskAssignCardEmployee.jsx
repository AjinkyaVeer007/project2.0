import React, { Fragment, useState } from "react";
import TaskModal from "./Modals/TaskModal";
import CustomButton from "./Buttons/CustomButton";
import { MdDataSaverOff } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils/constant";
import SelfTaskAddAlert from "./Modals/Alerts/SelfTaskAddAlert";

function TaskAssignCardEmployee({ taskList, getTasks }) {
  const userDetails = useSelector((state) => state.userData);
  const projectId = useSelector((state) => state.activeProjectData);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState(null);
  const [task, setTask] = useState("");

  const handleShowModal = (task) => {
    setData(task);
    setShowModal(!showModal);
  };

  const handleShowAlert = () => setShowAlert(!showAlert);

  // url
  const createTask_url = BASE_URL + "createtask";

  const assignTask = async (status, commit) => {
    let data = {
      userName: userDetails.name,
      userId: userDetails._id,
      adminId: userDetails.adminId,
      projectId: projectId.projectId,
      userType: userDetails.userType,
      taskList: [
        {
          task: task,
          isCompleted: status,
          commit: commit,
        },
      ],
    };

    await axios
      .post(createTask_url, data)
      .then((res) => {
        if (res.data.status) {
          setTask("");
          handleShowAlert();
          getTasks();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selfAssignTask = async () => {
    if (!task.length) {
      return false;
    } else {
      handleShowAlert();
    }
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
                    <div className="col-1 cursor-pointer">
                      <div
                        className={`taskCircle ${
                          task.isCompleted ? "taskCompleted" : "taskOngoing"
                        }`}
                      ></div>
                    </div>
                    <div className="col-10 cursor-pointer">
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
                      className="col-1 cursor-pointer"
                    >
                      <div className="bi bi-link text-success fs-5"></div>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <>
                <div className="col-1 cursor-pointer">
                  <div className="taskCircle taskOngoing"></div>
                </div>
                <div className="col-11 cursor-pointer">
                  <h6 className="text-danger">No Task Assign</h6>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <div className="rounded border p-1 d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control taskInputBox"
              placeholder="Enter Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <CustomButton
              handleClick={selfAssignTask}
              name={"Add"}
              bgColor={"secondary-bgcolor"}
              preIcon={<MdDataSaverOff size={"20px"} />}
            />
          </div>
        </div>
      </div>
      <TaskModal
        getTasks={getTasks}
        taskDetails={data}
        show={showModal}
        handleShow={handleShowModal}
      />
      <SelfTaskAddAlert
        show={showAlert}
        handleShow={handleShowAlert}
        handleSubmit={assignTask}
      />
    </div>
  );
}

export default TaskAssignCardEmployee;
