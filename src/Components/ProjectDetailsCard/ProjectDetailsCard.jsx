import React from "react";
import "./ProjectDetailsCard.css";

function ProjectDetailsCard() {
  const projectsArr = [
    { name: "Project1", progress: 50, id: 1 },
    { name: "Project2", progress: 25, id: 2 },
    { name: "Project3", progress: 75, id: 3 },
    { name: "Project4", progress: 10, id: 4 },
    { name: "Project5", progress: 90, id: 5 },
    { name: "Project6", progress: 40, id: 6 },
    { name: "Project7", progress: 100, id: 7 },
  ];
  return (
    <div className="col-lg-6 col-xl-6 col-md-6 col-12 mt-3">
      <div className="rounded-4 projectDetailsCard mx-3 p-2 shadow-sm">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <div className="bi bi-reception-3 text-danger"></div>
          <h5 className="text-center mb-2">Project Progress Status</h5>
        </div>
        {projectsArr &&
          projectsArr.map((item) => (
            <div key={item.id} className="d-grid m-2">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="project-name">{item.name}</div>
                <div>{`${item.progress}%`}</div>
              </div>
              <div>
                <div
                  style={{ height: "5px" }}
                  className="progress bg-white"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className={`progress-bar progress-bar-striped ${
                      item.progress <= 10 && "bg-danger"
                    } ${
                      item.progress > 10 && item.progress <= 99
                        ? "bg-warning"
                        : ""
                    } ${item.progress === 100 && "bg-success"}`}
                    style={{ width: `${item.progress}%`, height: "5px" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectDetailsCard;
