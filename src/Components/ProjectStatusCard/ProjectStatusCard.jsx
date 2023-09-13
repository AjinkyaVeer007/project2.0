import React from "react";
import "./ProjectStatusCard.css";

function ProjectStatusCard() {
  return (
    <div className="col-lg-6 col-md-6 col-xl-6 col-12">
      <div className="projectStatusCard rounded-4 p-2 mx-3 mt-4">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <div className="bi bi-activity"></div>
          <h5 className="text-center">Project Status</h5>
        </div>
        <div className="row">
          <div className="col-4 d-grid text-center">
            <div className="fw-bold fs-2">02</div>
            <div className="text-status">WORKING</div>
          </div>
          <div className="col-4 d-grid text-center">
            <div className="fw-bold fs-2">05</div>
            <div className="text-status">COMPLETED</div>
          </div>
          <div className="col-4 d-grid text-center">
            <div className="fw-bold fs-2">07</div>
            <div className="text-status">ALL</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectStatusCard;
