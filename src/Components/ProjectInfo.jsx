import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../Utils/constant";
import { projectData } from "../Store/projectSlice";

function ProjectInfo() {
  const projectId = useSelector((state) => state.activeProjectData);
  const projectDetails = useSelector((state) => state.projectsData);
  const userDetails = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const [projectInfo, setProjectInfo] = useState({});
  const [range, setRange] = useState(0);

  // urls
  const updateProjectDetails_url =
    BASE_URL + `updateprojectdetails/${projectId.projectId}`;
  const getProject_url = `${BASE_URL}getprojects`;

  const getProjects = async () => {
    const data = {
      userId: userDetails._id,
      userType: userDetails.userType,
    };

    await axios
      .post(getProject_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(projectData(res.data.projectData));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateprojectdetails = async () => {
    const data = {
      taskAllocationPercentage: range,
    };
    await axios
      .put(updateProjectDetails_url, data)
      .then((res) => {
        if (res.data.status) {
          getProjects();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProjectDetails = () => {
    let selectedProjectDetails = projectDetails.filter((project) => {
      return project._id === projectId.projectId;
    });
    setProjectInfo(selectedProjectDetails[0]);
    setRange(selectedProjectDetails[0].taskAllocationPercentage);
  };

  useEffect(() => {
    getProjectDetails();
  }, []);
  return (
    <div className="row">
      <h5 className="mb-2 primary-text-color">{projectInfo?.name}</h5>
      <div className="col-12 col-md-4 col-lg-4">
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
        </ul>
      </div>
      <div className="col-12 col-md-4 col-lg-4">
        <ul>
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
        </ul>
      </div>
      <div className="col-12 col-md-4 col-lg-4">
        <ul>
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
      <div className="col-12 col-lg-4 col-md-4">
        <div className="workallocationpercentagetext complementary-color mb-1">
          Update Work allocation percentage :{" "}
          <span className="fw-bold primary-text-color">{range}%</span>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            onBlur={updateprojectdetails}
            className="slider"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
