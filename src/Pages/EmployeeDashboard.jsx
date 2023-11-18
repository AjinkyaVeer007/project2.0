import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../Components/ProjectCard";
import { BASE_URL } from "../Utils/constant";
import axios from "axios";
import { projectData } from "../Store/projectSlice";

function EmployeeDashboard() {
  const userDetails = useSelector((state) => state.userData);
  const projectDetails = useSelector((state) => state.projectsData);

  const dispatch = useDispatch();

  // url
  const getProjectDetails_url = BASE_URL + "getprojects";

  const getProjectDetails = async () => {
    const data = {
      userId: userDetails._id,
      userType: userDetails.userType,
    };

    await axios
      .post(getProjectDetails_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(projectData(res.data.projectData));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  return (
    <div className="row mt-2 mx-2 border rounded p-2 p-lg-3 bg-white">
      <h5 className="mt-2 mb-3 fw-medium">Your Projects</h5>
      {projectDetails.length ? (
        projectDetails.map((project) => {
          return <ProjectCard key={project?._id} data={project} />;
        })
      ) : (
        <h5 className="text-danger">No Project Assign.</h5>
      )}
    </div>
  );
}

export default EmployeeDashboard;
