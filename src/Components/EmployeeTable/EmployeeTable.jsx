import Table from "react-bootstrap/Table";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import "./EmployeeTable.css";
import { useSelector } from "react-redux";
import EditEmployeeModal from "../Modals/EditEmployeeModal/EditEmployeeModal";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EmployeeTable({ handleEmployeeList }) {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 1000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleShow = (id) => {
    setSelectedData(
      userDetails.employeesList.filter((employee) => {
        return employee._id === id;
      })[0]
    );
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
      <Table hover responsive>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>One Time Password</th>
            <th>Post</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.employeesList.length &&
            userDetails.employeesList.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
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
                        handleShow(item._id);
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
            ))}
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
