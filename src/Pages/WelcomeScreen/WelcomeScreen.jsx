import React from "react";
import Greeting from "../../Components/Greeting/Greeting";
import ProjectStatusCard from "../../Components/ProjectStatusCard/ProjectStatusCard";
import EmployeeStatusCard from "../../Components/EmployeeStatusCard/EmployeeStatusCard";

function WelcomeScreen() {
  return (
    <>
      <Greeting />
      <div className="row">
        <ProjectStatusCard />
        <EmployeeStatusCard />
      </div>
    </>
  );
}

export default WelcomeScreen;
