import Table from "react-bootstrap/Table";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import "./EmployeeTable.css";

function EmployeeTable() {
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
        <tr>
          <td>1</td>
          <td>Rushi</td>
          <td>rushi@gmail.com</td>
          <td>1234@3432</td>
          <td>Manager</td>
          <td>
            <div className="d-flex align-items-center gap-3">
              <MdModeEditOutline size={"20px"} color="#44ce42" />
              <MdDelete size={"20px"} color="tomato" />
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
