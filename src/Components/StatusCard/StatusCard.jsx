import React from "react";
import "./StatusCard.css";
import CardPattern from "../../Assets/SVG/cardpattern.svg";

function ProjectStatusCard({ heading, icon, countData }) {
  return (
    <div className="col-lg-6 col-md-6 col-xl-6 col-12">
      <div className="statusCard rounded-4 p-2 mx-3 mt-4 shadow-sm">
        <div
          className="card-pattern"
          style={{ backgroundImage: `url(${CardPattern})` }}
        ></div>
        <div className="card-shade"></div>
        <div className="position-relative d-flex justify-content-center align-items-center gap-2 mb-3">
          <div className={icon}></div>
          <h5 className="text-center">{heading}</h5>
        </div>
        <div className="row position-relative">
          {countData &&
            countData.map((item) => (
              <div key={item.id} className="col-4 d-grid text-center">
                <div className="fw-bold fs-2">{item.count}</div>
                <div className="text-status">{item.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectStatusCard;
