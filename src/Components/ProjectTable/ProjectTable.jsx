import React, { useState } from "react";
import "./ProjectTable.css";
import Table from "react-bootstrap/Table";
import { MdRemoveRedEye, MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import EditProjectModal from "../Modals/EditProjectModal/EditProjectModal";
import { projectModalData } from "../../Store/projectModalSlice";

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

  return (
    <>
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
              <th>Assign Managers</th>
              <th>Assign Employees</th>
              <th>Task Allocation</th>
              <th>Actions</th>
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
                        navigate(
                          "/auth/admin/dashboard/project/taskallocation"
                        );
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
      </div>
      <EditProjectModal
        show={show}
        handleShow={handleShow}
        getProjects={getProjects}
      />
    </>
  );
}

export default ProjectTable;
