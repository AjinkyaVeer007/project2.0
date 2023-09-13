import React from "react";
import Greeting from "../../Components/Greeting/Greeting";
import ProjectStatusCard from "../../Components/ProjectStatusCard/ProjectStatusCard";
import EmployeeStatusCard from "../../Components/EmployeeStatusCard/EmployeeStatusCard";
import ProjectDetailsCard from "../../Components/ProjectDetailsCard/ProjectDetailsCard";

function WelcomeScreen() {
  return (
    <>
      <Greeting />
      <div className="row">
        <ProjectStatusCard />
        <EmployeeStatusCard />
      </div>
      <div className="row">
        <ProjectDetailsCard />
      </div>
    </>
  );
}

export default WelcomeScreen;
