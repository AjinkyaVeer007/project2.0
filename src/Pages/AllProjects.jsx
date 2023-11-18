import React, { useEffect } from "react";
import ProjectCard from "../Components/ProjectCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { projectData } from "../Store/projectSlice";

function AllProjects() {
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
    <div className="row mt-2 mx-2 border rounded p-2 p-lg-3 bg-white">
      <h5 className="mt-2 mb-3 fw-medium">All Projects List</h5>
      <hr />
      {projectDetails.length ? (
        projectDetails.map((project) => {
          return <ProjectCard key={project._id} data={project} />;
        })
      ) : (
        <h6 className="text-danger">No project found</h6>
      )}
    </div>
  );
}

export default AllProjects;
