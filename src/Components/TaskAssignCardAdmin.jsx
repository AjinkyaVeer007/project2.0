import React, { Fragment, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CustomButton from "./Buttons/CustomButton";
import { MdDataSaverOff } from "react-icons/md";

function TaskAssignCardAdmin({ data, getTasks }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { id, name, email, taskList } = data;

  const userDetails = useSelector((state) => state.userData);
  const projectId = useSelector((state) => state.activeProjectData);

  const [task, setTask] = useState("");

  // url
  const createTask_url = BASE_URL + "createtask";

  const handleTask = async () => {
    if (!task.length) {
      return false;
    }
    let data = {
      userName: name,
      userId: id,
      adminId:
        userDetails.userType === "Admin"
          ? userDetails._id
          : userDetails.adminId,
      projectId: projectId.projectId,
      userType: userDetails.userType,
      taskList: [
        {
          task: task,
        },
      ],
    };

    await axios
      .post(createTask_url, data)
      .then((res) => {
        if (res.data.status) {
          setTask("");
          getTasks();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="col-12 col-lg-4 col-md-6">
      <div className="rounded border taskCard p-3 m-2 d-flex flex-column">
        <div>
          <h6 className="taskUser">{name}</h6>
          <h6 className="taskEmail">{email}</h6>
          <div className="border-bottom my-3"></div>
          <div className="taskContainer customscrollbar">
            <div className="row align-items-center">
              {taskList.length ? (
                taskList[0].taskList.map((task) => {
                  return (
                    <Fragment key={task._id}>
                      <div className="col-1 cursor-pointer">
                        <div
                          className={`taskCircle ${
                            task.isCompleted ? "taskCompleted" : "taskOngoing"
                          }`}
                        ></div>
                      </div>
                      <div className="col-11 cursor-pointer">
                        <a
                          href={task.commit}
                          target="_blank"
                          className="d-flex align-items-center gap-1 taskName"
                        >
                          <div
                            className={`${
                              task.isCompleted && "text-decoration-line-through"
                            } `}
                          >
                            {task.task}
                          </div>
                          {task.commit && (
                            <div className="bi bi-link text-success fs-5"></div>
                          )}
                        </a>
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
              handleClick={handleTask}
              name={"Add"}
              bgColor={"secondary-bgcolor"}
              preIcon={<MdDataSaverOff size={"20px"} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskAssignCardAdmin;
