import React from "react";
import Greeting from "../../Components/Greeting/Greeting";
import StatusCard from "../../Components/StatusCard/StatusCard";
import ProjectDetailsCard from "../../Components/ProjectDetailsCard/ProjectDetailsCard";

function WelcomeScreen() {
  const projectStatusArr = [
    { id: 1, name: "WORKING", count: "02" },
    { id: 2, name: "COMPLETED", count: "05" },
    { id: 3, name: "COMPLETED", count: "07" },
  ];

  const employeeStatusArr = [
    { id: 4, name: "MANAGERS", count: "04" },
    { id: 5, name: "EMPLOYEES", count: "20" },
    { id: 6, name: "ALL", count: "24" },
  ];

  return (
    <>
      <Greeting />
      <div className="row">
        <StatusCard
          heading={"Project Status"}
          icon={"bi bi-activity"}
          countData={projectStatusArr}
        />
        <StatusCard
          heading={"Registered Employees"}
          icon={"bi bi-people-fill"}
          countData={employeeStatusArr}
        />
      </div>
      <div className="row">
        <ProjectDetailsCard />
      </div>
    </>
  );
}

export default WelcomeScreen;
