import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../Pages/AdminDashboard";
import Company from "../Pages/Company";
import CreateProject from "../Pages/CreateProject";
import TaskAllocationAdmin from "../Pages/TaskAllocationAdmin";
import EmployeeDashboard from "../Pages/EmployeeDashboard";
import TaskAllocationEmployee from "../Pages/TaskAllocationEmployee";
import AllProjects from "../Pages/AllProjects";
import ProjectDetails from "../Pages/ProjectDetails";

function ComponentRouting() {
  return (
    <Routes>
      <Route path="admin/welcome" element={<AdminDashboard />} />
      <Route path="employee/welcome" element={<EmployeeDashboard />} />
      <Route path="projects" element={<AllProjects />} />
      <Route path="createcompany" element={<Company />} />
      <Route path="createproject" element={<CreateProject />} />
      <Route path="project/projectdetails" element={<ProjectDetails />} />
    </Routes>
  );
}

export default ComponentRouting;
