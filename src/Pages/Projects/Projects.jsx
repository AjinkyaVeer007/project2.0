import React from "react";
import Table from "react-bootstrap/Table";
import { MdRemoveRedEye, MdDelete } from "react-icons/md";

function Projects() {
  return (
    <div className="mt-5">
      <div className="text-center fs-5 mb-2 company-headingText">
        All Projects List
      </div>
      <div className="row mx-2 p-2 border rounded">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Project Name</th>
              <th>Start Date</th>
              <th>Proposed End Date</th>
              <th>Managers Assign</th>
              <th>Emplyees Assign</th>
              <th>Completion Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sampoorn Nivesh</td>
              <td>01 July 2023</td>
              <td>02 Sept 2023</td>
              <td>01</td>
              <td>05</td>
              <td>
                <div className="d-flex align-items-center gap-3 w-100">
                  <div style={{ width: "-webkit-fill-available" }}>
                    <div
                      style={{ height: "5px" }}
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className={`progress-bar progress-bar-striped bg-warning`}
                        style={{ width: `50%`, height: "5px" }}
                      ></div>
                    </div>
                  </div>
                  <div>50%</div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <MdRemoveRedEye size={"20px"} color="#44ce42" />
                  <MdDelete size={"20px"} color="tomato" />
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sampoorn Nivesh</td>
              <td>01 July 2023</td>
              <td>02 Sept 2023</td>
              <td>01</td>
              <td>05</td>
              <td>
                <div className="d-flex align-items-center gap-3 w-100">
                  <div style={{ width: "-webkit-fill-available" }}>
                    <div
                      style={{ height: "5px" }}
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className={`progress-bar progress-bar-striped bg-warning`}
                        style={{ width: `50%`, height: "5px" }}
                      ></div>
                    </div>
                  </div>
                  <div>50%</div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <MdRemoveRedEye size={"20px"} color="#44ce42" />
                  <MdDelete size={"20px"} color="tomato" />
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sampoorn Nivesh</td>
              <td>01 July 2023</td>
              <td>02 Sept 2023</td>
              <td>01</td>
              <td>05</td>
              <td>
                <div className="d-flex align-items-center gap-3 w-100">
                  <div style={{ width: "-webkit-fill-available" }}>
                    <div
                      style={{ height: "5px" }}
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className={`progress-bar progress-bar-striped bg-warning`}
                        style={{ width: `50%`, height: "5px" }}
                      ></div>
                    </div>
                  </div>
                  <div>50%</div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <MdRemoveRedEye size={"20px"} color="#44ce42" />
                  <MdDelete size={"20px"} color="tomato" />
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sampoorn Nivesh</td>
              <td>01 July 2023</td>
              <td>02 Sept 2023</td>
              <td>01</td>
              <td>05</td>
              <td>
                <div className="d-flex align-items-center gap-3 w-100">
                  <div style={{ width: "-webkit-fill-available" }}>
                    <div
                      style={{ height: "5px" }}
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className={`progress-bar progress-bar-striped bg-warning`}
                        style={{ width: `50%`, height: "5px" }}
                      ></div>
                    </div>
                  </div>
                  <div>50%</div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <MdRemoveRedEye size={"20px"} color="#44ce42" />
                  <MdDelete size={"20px"} color="tomato" />
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sampoorn Nivesh</td>
              <td>01 July 2023</td>
              <td>02 Sept 2023</td>
              <td>01</td>
              <td>05</td>
              <td>
                <div className="d-flex align-items-center gap-3 w-100">
                  <div style={{ width: "-webkit-fill-available" }}>
                    <div
                      style={{ height: "5px" }}
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className={`progress-bar progress-bar-striped bg-warning`}
                        style={{ width: `50%`, height: "5px" }}
                      ></div>
                    </div>
                  </div>
                  <div>50%</div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <MdRemoveRedEye size={"20px"} color="#44ce42" />
                  <MdDelete size={"20px"} color="tomato" />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Projects;
