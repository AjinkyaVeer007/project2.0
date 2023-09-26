import React from "react";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <div className="text-center fs-5 mb-2 company-headingText">
        All Projects List
      </div>
      <hr />
      <ProjectCard />
    </div>
  );
}

export default Projects;
