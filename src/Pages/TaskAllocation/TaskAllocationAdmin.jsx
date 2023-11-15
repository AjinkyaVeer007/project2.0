import React, { useEffect, useState } from "react";
import "./TaskAllocation.css";
import TaskAssignCard from "../../Components/TaskCard/TaskAssignCard";
import axios from "axios";
import { useSelector } from "react-redux";

function TaskAllocation() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const userDetails = useSelector((state) => state.userData);
  const projectId = useSelector((state) => state.activeProjectData);

  const [managerTaskList, setManagerTaskList] = useState([]);
  const [employeeTaskList, setEmployeeTaskList] = useState([]);

  const getTask_url =
    BASE_URL + `projecttask/${userDetails.userType}/${projectId.projectId}`;

  const getTasks = async () => {
    await axios
      .get(getTask_url)
      .then((res) => {
        if (res.data.status) {
          setManagerTaskList(res.data?.projectTask?.managers);
          setEmployeeTaskList(res.data?.projectTask?.employees);
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
    <div className="row mt-5">
      <div className="container">
        <div className="row">
          {managerTaskList.length ? (
            <>
              <h5 className="my-2">Managers Tasks</h5>
              {managerTaskList.length
                ? managerTaskList.map((managerData) => {
                    return (
                      <TaskAssignCard
                        key={managerData.id}
                        data={managerData}
                        getTasks={getTasks}
                      />
                    );
                  })
                : ""}
              <hr className="mt-2" />
            </>
          ) : (
            ""
          )}
          <h5 className="my-2">Employees Tasks</h5>
          {employeeTaskList.length
            ? employeeTaskList.map((employeeData) => {
                return (
                  <TaskAssignCard
                    key={employeeData.id}
                    data={employeeData}
                    getTasks={getTasks}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default TaskAllocation;
