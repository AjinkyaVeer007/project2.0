import React from "react";
import "./ProjectProgressCard.css";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeProjectId } from "../../Store/activeProject";

function ProjectProgressCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userData);

  const { _id, name, progress } = data;

  const handleNavigation = () => {
    dispatch(activeProjectId(_id));
    userDetails.userType === "Employee"
      ? navigate("/auth/admin/dashboard/project/employee/taskallocation")
      : navigate("/auth/admin/dashboard/project/admin/taskallocation");
  };
  return (
    <div className="col-6 col-lg-3 col-md-4">
      <div
        onClick={handleNavigation}
        className="projectprogresscard cursor-pointer border m-2 rounded d-flex flex-column"
      >
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
