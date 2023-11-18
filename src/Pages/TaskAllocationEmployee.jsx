import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskAssignCardEmployee from "../Components/TaskAssignCardEmployee";

function TaskAllocationEmployee() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const userDetails = useSelector((state) => state.userData);
  const projectId = useSelector((state) => state.activeProjectData);

  const [tasks, setTasks] = useState([]);

  const getTask_url =
    BASE_URL + `getTask/${projectId.projectId}/${userDetails._id}`;

  const getTasks = async () => {
    await axios
      .get(getTask_url)
      .then((res) => {
        if (res.data.status) {
          setTasks(res.data.taskList.taskList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="mb-5">
      <TaskAssignCardEmployee getTasks={getTasks} taskList={tasks} />
    </div>
  );
}

export default TaskAllocationEmployee;
