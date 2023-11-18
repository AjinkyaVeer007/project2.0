import Table from "react-bootstrap/Table";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import EditEmployeeModal from "./Modals/EditEmployeeModal/EditEmployeeModal";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EmployeeTable({ handleEmployeeList }) {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 1000, theme: "colored", type: type });

  const employeesDetails = useSelector((state) => state.employeesData);

  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleShow = (id, userType) => {
    if (userType === "Manager") {
      setSelectedData(
        employeesDetails?.managers.filter((manager) => {
          return manager._id === id;
        })[0]
      );
    } else {
      setSelectedData(
        employeesDetails?.employees.filter((employee) => {
          return employee._id === id;
        })[0]
      );
    }
    setShow(!show);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleDeleteEmployee = async (id) => {
    const deleteEmployee_Url = `${BASE_URL}deleteemployeedetails/${id}`;

    await axios
      .delete(deleteEmployee_Url)
      .then((res) => {
        if (res.data.status) {
          notify(res.data.message, "success");
          handleEmployeeList();
        }
      })
      .catch((err) => {
        notify(err.response.data, "error");
      });
  };

  return (
    <>
      <Table bordered responsive>
        <thead>
          <tr>
            <th className="tableHeadingBg-color text-white">Employee Name</th>
            <th className="tableHeadingBg-color text-white">Email</th>
            <th className="tableHeadingBg-color text-white">
              One Time Password
            </th>
            <th className="tableHeadingBg-color text-white">Post</th>
            <th className="tableHeadingBg-color text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {employeesDetails?.managers?.length
            ? employeesDetails?.managers.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{!item.isPasswordChange && item.defaultPassword}</td>
                  <td>{item.userType}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <MdModeEditOutline
                        size={"20px"}
                        color="#44ce42"
                        onClick={() => {
                          handleShow(item._id, item.userType);
                        }}
                      />
                      <MdDelete
                        onClick={() => {
                          handleDeleteEmployee(item._id);
                        }}
                        size={"20px"}
                        color="tomato"
                      />
                    </div>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
        <tbody>
          {employeesDetails?.employees?.length
            ? employeesDetails?.employees.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{!item.isPasswordChange && item.defaultPassword}</td>
                  <td>{item.userType}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <MdModeEditOutline
                        size={"20px"}
                        color="#44ce42"
                        onClick={() => {
                          handleShow(item._id, item.userType);
                        }}
                      />
                      <MdDelete
                        onClick={() => {
                          handleDeleteEmployee(item._id);
                        }}
                        size={"20px"}
                        color="tomato"
                      />
                    </div>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
      <EditEmployeeModal
        show={show}
        handleShow={handleShow}
        data={selectedData}
        handleEmployeeList={handleEmployeeList}
      />
    </>
  );
}

export default EmployeeTable;