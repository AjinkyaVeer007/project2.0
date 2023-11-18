import React from "react";
import { Accordion } from "react-bootstrap";
import ProjectInfo from "../Components/ProjectInfo";
import { useSelector } from "react-redux";
import TaskAllocationEmployee from "./TaskAllocationEmployee";
import TaskAllocationAdmin from "./TaskAllocationAdmin";

function ProjectDetails() {
  const userDetails = useSelector((state) => state.userData);
  return (
    <div className="row mt-2 mx-2 border rounded p-2 p-lg-3 bg-white">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Project Details</Accordion.Header>
          <Accordion.Body>
            <ProjectInfo />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Task Allocation</Accordion.Header>
          <Accordion.Body>
            {userDetails.userType === "Employee" ? (
              <TaskAllocationEmployee />
            ) : (
              <TaskAllocationAdmin />
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ProjectDetails;
