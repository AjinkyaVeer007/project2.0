import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { MdRemoveRedEye, MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import EditProjectModal from "./Modals/EditProjectModal/EditProjectModal";
import { projectModalData } from "../Store/projectModalSlice";
import { activeProjectId } from "../Store/activeProject";

function ProjectTable({ getProjects }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectDetails = useSelector((state) => state.projectsData);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleModal = (data) => {
    dispatch(projectModalData(data));
    setShow(!show);
  };

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleDeleteProject = async (id) => {
    const deleteProject_url = `${BASE_URL}deleteprojectdetails/${id}`;

    await axios
      .delete(deleteProject_url)
      .then((res) => {
        if (res.data.status) {
          getProjects();
          notify(res.data.message, "success");
        }
      })
      .catch((err) => {
        notify(err.response.data, "error");
      });
  };

  const handleTaskAllocation = (projectId) => {
    dispatch(activeProjectId(projectId));
    navigate("/auth/dashboard/project/projectdetails");
  };

  return (
    <>
      <h5 className="mt-2 mb-3 fw-medium">All Project List</h5>
      <Table bordered responsive>
        <thead>
          <tr>
            <th className="tableHeadingBg-color text-white">Sr.No.</th>
            <th className="tableHeadingBg-color text-white">Project Name</th>
            <th className="tableHeadingBg-color text-white">Start Date</th>
            <th className="tableHeadingBg-color text-white">
              Proposed End Date
            </th>
            <th className="tableHeadingBg-color text-white">Priority</th>
            <th className="tableHeadingBg-color text-white">Assign Managers</th>
            <th className="tableHeadingBg-color text-white">
              Assign Employees
            </th>
            <th className="tableHeadingBg-color text-white">Task Allocation</th>
            <th className="tableHeadingBg-color text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectDetails.length &&
            projectDetails.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.startDate}</td>
                <td>{item.proposeEndDate}</td>
                <td>
                  <div
                    style={{
                      color: `${item.priority === "High" ? "#ff4848" : ""} ${
                        item.priority === "Medium" ? "#ffb648" : ""
                      } ${item.priority === "Moderate" ? "#64f837" : ""}`,
                    }}
                    className="fw-bold"
                  >
                    {item.priority}
                  </div>
                </td>
                <td className="text-center">
                  {item.managers ? item.managers.length : 0}
                </td>
                <td className="text-center">{item.employees?.length}</td>
                <td className="text-center">
                  <MdRemoveRedEye
                    size={"20px"}
                    color="#44ce42"
                    onClick={() => {
                      handleTaskAllocation(item._id);
                    }}
                  />
                </td>
                <td className="d-flex align-items-center justify-content-center gap-3">
                  <MdModeEditOutline
                    onClick={() => {
                      handleModal(item);
                    }}
                    size={"20px"}
                    color="#44ce42"
                  />
                  <MdDelete
                    onClick={() => {
                      handleDeleteProject(item._id);
                    }}
                    size={"20px"}
                    color="tomato"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <EditProjectModal
        show={show}
        handleShow={handleShow}
        getProjects={getProjects}
      />
    </>
  );
}

export default ProjectTable;
