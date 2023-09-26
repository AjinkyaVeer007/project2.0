import React from "react";
import Table from "react-bootstrap/Table";
import { MdRemoveRedEye, MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProjectTable() {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userData);
  return (
    <div className="mt-2">
      <div className="text-center fs-5 mb-2 company-headingText">
        All Projects List
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>Proposed End Date</th>
            <th>Priority</th>
            <th>Managers Assign</th>
            <th>Emplyees Assign</th>
            <th>Task Allocation</th>
            <th>Delete Project</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.projectList &&
            userDetails.projectList.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.startDate}</td>
                <td>{item.proposeEndDate}</td>
                <td>{item.priority}</td>
                <td className="text-center">{item.managerIds.length}</td>
                <td className="text-center">{item.employeeIds.length}</td>
                <td className="text-center">
                  <MdRemoveRedEye
                    size={"20px"}
                    color="#44ce42"
                    onClick={() => {
                      navigate("/auth/admin/dashboard/project/taskallocation");
                    }}
                  />
                </td>
                <td className="d-flex align-items-center justify-content-center gap-3">
                  <MdModeEditOutline size={"20px"} color="#44ce42" />
                  <MdDelete size={"20px"} color="tomato" />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProjectTable;
