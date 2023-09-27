import Table from "react-bootstrap/Table";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import "./EmployeeTable.css";
import { useSelector } from "react-redux";

function EmployeeTable() {
  const userDetails = useSelector((state) => state.userData);

  console.log(userDetails);

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Sr.No.</th>
          <th>Employee Name</th>
          <th>Email</th>
          <th>Password</th>
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
              <td>{item.password}</td>
              <td>{item.userType}</td>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <MdModeEditOutline size={"20px"} color="#44ce42" />
                  <MdDelete size={"20px"} color="tomato" />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
