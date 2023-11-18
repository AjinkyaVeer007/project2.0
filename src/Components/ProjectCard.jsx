import React from "react";
import { ProgressBar } from "react-bootstrap";
import { activeProjectId } from "../Store/activeProject";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProjectCard({ data }) {
  const {
    _id,
    name,
    startDate,
    proposeEndDate,
    progress,
    priority,
    managers,
    employees,
  } = data;

  const userDetails = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToProjectDetails = (projectId) => {
    dispatch(activeProjectId(projectId));
    navigate("/auth/dashboard/project/projectdetails");
  };
  return (
    <div
      onClick={() => handleNavigateToProjectDetails(_id)}
      className="col-12 col-lg-4 col-md-6 mb-2"
    >
      <div className="border rounded m-2">
        <div className="projectCard rounded-top position-relative">
          <div className="custom-gradient rounded-top"></div>
          <div className="projectText text-white fw-medium">
            <h5 className="mb-1">{name}</h5>
            <div
              style={{ animationDelay: "0.2s" }}
              className="projectDetailsText"
            >
              Start date : {startDate}
            </div>
            <div
              style={{ animationDelay: "0.4s" }}
              className="projectDetailsText"
            >
              Proposed end date : {proposeEndDate}
            </div>
            <div
              style={{ animationDelay: "0.6s" }}
              className="projectDetailsText"
            >
              Priority : {priority}
            </div>
            <div
              style={{ animationDelay: "0.8s" }}
              className="projectDetailsText"
            >
              Managers: {managers?.length}
            </div>
            <div
              style={{ animationDelay: "1s" }}
              className="projectDetailsText"
            >
              Employees : {employees?.length}
            </div>
          </div>
        </div>
        <div className="p-2">
          <ProgressBar variant="danger" now={progress} label={`${progress}%`} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
