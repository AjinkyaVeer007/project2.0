import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "../Pages/WelcomeScreen/WelcomeScreen";
import Projects from "../Pages/Projects/Projects";
import Company from "../Pages/Company/Company";
import CreateProject from "../Pages/CreateProject/CreateProject";
import TaskAllocationAdmin from "../Pages/TaskAllocation/TaskAllocationAdmin";
import EmployeeDashboard from "../Pages/EmployeeDashboard";
import TaskAllocationEmployee from "../Pages/TaskAllocation/TaskAllocationEmployee";

function ComponentRouting() {
  return (
    <Routes>
      <Route path="admin/welcome" element={<WelcomeScreen />} />
      <Route path="employee/welcome" element={<EmployeeDashboard />} />
      <Route path="projects" element={<Projects />} />
      <Route path="createcompany" element={<Company />} />
      <Route path="createproject" element={<CreateProject />} />
      <Route
        path="project/admin/taskallocation"
        element={<TaskAllocationAdmin />}
      />
      <Route
        path="project/employee/taskallocation"
        element={<TaskAllocationEmployee />}
      />
    </Routes>
  );
}

export default ComponentRouting;
