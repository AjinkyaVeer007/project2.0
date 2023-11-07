import React from "react";
import "./ProjectProgressCard.css";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";

function ProjectProgressCard({ data }) {
  const { name, progress } = data;
  return (
    <div className="col-6 col-lg-3 col-md-4">
      <div className="projectprogresscard border m-2 rounded d-flex flex-column">
        <div className="m-auto">
          <CircularProgressBar progreePercentage={progress} />
        </div>
        <div className="bg-warning h-50 mt-auto m-2 rounded text-white">
          <h6 className="d-flex text-truncate justify-content-center align-items-center h-100 fw-bold">
            {name}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default ProjectProgressCard;
