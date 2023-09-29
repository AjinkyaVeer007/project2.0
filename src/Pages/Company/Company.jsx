import React from "react";
import "./Company.css";
import RegisterCompany from "../../Components/RegisterCompany/RegisterCompany";
import RegisterEmployees from "../../Components/RegisterEmployees/RegisterEmployees";

function Company() {
  return (
    <div className="row mt-5 mx-2">
      <RegisterCompany />
      <RegisterEmployees />
    </div>
  );
}

export default Company;
