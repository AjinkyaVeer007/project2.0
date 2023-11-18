import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Utils/constant";
import { useSelector } from "react-redux";

function ProjectInfo() {
  const projectId = useSelector((state) => state.activeProjectData);
  const projectDetails = useSelector((state) => state.projectsData);

  const [projectInfo, setProjectInfo] = useState({});

  const getProjectDetails = () => {
    let selectedProjectDetails = projectDetails.filter((project) => {
      return project._id === projectId.projectId;
    });
    setProjectInfo(selectedProjectDetails[0]);
  };

  useEffect(() => {
    getProjectDetails();
  }, []);
  return (
    <div>
      <h5 className="mb-2 primary-text-color">{projectInfo?.name}</h5>
      <ul>
        <li className="primary-text-color">
          Start date : {projectInfo?.startDate}
        </li>
        <li className="primary-text-color">
          Proposed end date : {projectInfo?.proposeEndDate}
        </li>
        <li className="primary-text-color">
          Priority : {projectInfo?.priority}
        </li>
        <li className="primary-text-color">
          Completion percentage : {`${projectInfo?.progress}%`}
        </li>
        <li className="primary-text-color">
          Managers :{" "}
          <ul>
            {projectInfo?.managers?.length ? (
              projectInfo?.managers.map((manager) => {
                return (
                  <li key={manager._id} className="primary-text-color">
                    {manager.name}
                  </li>
                );
              })
            ) : (
              <div className="text-danger">No managers assign</div>
            )}
          </ul>
        </li>
        <li className="primary-text-color">
          Employees :{" "}
          <ul>
            {projectInfo?.employees?.length
              ? projectInfo?.employees.map((employee) => {
                  return (
                    <li key={employee._id} className="primary-text-color">
                      {employee.name}
                    </li>
                  );
                })
              : ""}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default ProjectInfo;
