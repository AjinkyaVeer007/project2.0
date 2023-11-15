import React, { useEffect, useState } from "react";
import Greeting from "../../Components/Greeting/Greeting";
import StatusCard from "../../Components/StatusCard/StatusCard";
import { useSelector } from "react-redux";
import ProjectProgressCard from "../../Components/ProjectDetailsCard/ProjectProgressCard";

function WelcomeScreen() {
  const employeeDetails = useSelector((state) => state.employeesData);
  const projectDetails = useSelector((state) => state.projectsData);
  const userDetails = useSelector((state) => state.userData);

  const [employeeCardData, setEmployeeCardData] = useState([]);

  const projectStatusArr = [
    { id: 1, name: "WORKING", count: "02" },
    { id: 2, name: "COMPLETED", count: "05" },
    { id: 3, name: "TOTAL", count: "07" },
  ];

  const handleEmployeeCard = () => {
    let employeeArr = [
      {
        id: 4,
        name: "MANAGERS",
        count: employeeDetails?.managers?.length,
      },
      {
        id: 5,
        name: "EMPLOYEES",
        count: employeeDetails?.employees?.length,
      },
      {
        id: 6,
        name: "ALL",
        count:
          Number(employeeDetails?.managers?.length) +
          Number(employeeDetails?.employees?.length),
      },
    ];
    setEmployeeCardData(employeeArr);
  };

  useEffect(() => {
    handleEmployeeCard();
  }, []);

  return (
    <>
      <Greeting />
      {userDetails.userType === "Admin" && (
        <div className="row">
          <StatusCard
            heading={"Project Status"}
            icon={"bi bi-activity"}
            countData={projectStatusArr}
          />
          {employeeDetails.employees && (
            <StatusCard
              heading={"Registered Employees"}
              icon={"bi bi-people-fill"}
              countData={employeeCardData}
            />
          )}
        </div>
      )}
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

export default WelcomeScreen;
