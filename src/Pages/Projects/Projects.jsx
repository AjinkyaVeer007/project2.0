import React, { useEffect } from "react";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { projectData } from "../../Store/projectSlice";

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);
  const projectDetails = useSelector((state) => state.projectsData);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="mt-5">
      <div className="text-center fs-5 mb-2 company-headingText">
        All Projects List
      </div>
      <hr />
      <div className="row">
        {projectDetails.length &&
          projectDetails.map((project) => (
            <ProjectCard key={project._id} data={project} />
          ))}
      </div>
    </div>
  );
}

export default Projects;
