import React from "react";
import "./EmployeeStatusCard.css";

function EmployeeStatusCard() {
  return (
    <div className="col-lg-6 col-md-6 col-xl-6 col-12">
      <div className="projectStatusCard rounded-4 p-2 mx-3 mt-4">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <div className="bi bi-people-fill"></div>
          <h5 className="text-center">Registered Employees</h5>
        </div>
        <div className="row">
          <div className="col-4 d-grid text-center">
            <div className="fw-bold fs-2">04</div>
            <div className="text-status">Managers</div>
          </div>
          <div className="col-4 d-grid text-center">
            <div className="fw-bold fs-2">20</div>
            <div className="text-status">Employees</div>
          </div>
          <div className="col-4 d-grid text-center">
            <div className="fw-bold fs-2">24</div>
            <div className="text-status">ALL</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeStatusCard;
