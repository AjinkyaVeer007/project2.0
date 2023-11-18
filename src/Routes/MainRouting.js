import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Layout from "../Layout/Layout";

function MainRouting() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/dashboard/*" element={<Layout />} />
    </Routes>
  );
}

export default MainRouting;
