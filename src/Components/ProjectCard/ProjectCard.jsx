import React from "react";
import "./ProjectCard.css";
import CardPattern from "../../Assets/SVG/cardpattern.svg";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";

function ProjectCard({ data }) {
  return (
    <div className="col-12 col-lg-4 col-md-6 mb-2">
      <div className="projectCard shadow rounded-4 p-3 mx-3 position-relative">
        <div
          className="card-pattern"
          style={{ backgroundImage: `url(${CardPattern})` }}
        ></div>
        <div className="card-shade"></div>
        <div className="ms-2 projectCardInfo">
          <div className="d-flex justify-content-start align-items-center gap-2 mt-1 text-white">
            <div className="bi bi-easel-fill"></div>
            <h6>{data.name}</h6>
          </div>
          <hr className="text-white" />
          <div className="projectDetails d-flex gap-2">
            <div className="projectDetails-title border-bottom">Start Date</div>
            <div className="projectDetails-title">:</div>
            <div className="text-white">{data.startDate}</div>
          </div>
          <div className="projectDetails d-flex gap-2">
            <div className="projectDetails-title border-bottom">End Date</div>
            <div className="projectDetails-title">:</div>
            <div className="text-white">{data.proposeEndDate}</div>
          </div>
          <div className="projectDetails d-flex gap-2">
            <div className="projectDetails-title border-bottom">
              Working Managers
            </div>
            <div className="projectDetails-title">:</div>
            <div className="text-white">
              {data.managers ? data.managers.length : 0}
            </div>
          </div>
          <div className="projectDetails d-flex gap-2">
            <div className="projectDetails-title border-bottom">
              Working Employees
            </div>
            <div className="projectDetails-title">:</div>
            <div className="text-white">{data.employees.length}</div>
          </div>
        </div>
        <div className="position-absolute end-0 bottom-0 m-2">
          <CircularProgressBar progreePercentage={data.progress} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
