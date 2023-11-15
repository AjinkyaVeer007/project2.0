import React from "react";
import Greeting from "../Components/Greeting/Greeting";
import ProjectProgressCard from "../Components/ProjectDetailsCard/ProjectProgressCard";
import { useSelector } from "react-redux";

function EmployeeDashboard() {
  const projectDetails = useSelector((state) => state.projectsData);
  return (
    <>
      <Greeting />
      {projectDetails.length ? (
        <>
          <hr />
          <h5 className="text-center fw-medium">Projects</h5>
          <div className="container">
            <div className="row my-2">
              {projectDetails.length &&
                projectDetails.map((project) => {
                  return (
                    <ProjectProgressCard key={project?._id} data={project} />
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default EmployeeDashboard;
