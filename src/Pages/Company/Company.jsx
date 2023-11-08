import React from "react";
import "./Company.css";
import RegisterCompany from "../../Components/RegisterCompany/RegisterCompany";
import RegisterEmployees from "../../Components/RegisterEmployees/RegisterEmployees";
import { useSelector } from "react-redux";

function Company() {
  const companyDetails = useSelector((state) => state.companyData);
  return (
    <div className="row mt-5 mx-2">
      <RegisterCompany />
      {companyDetails && <RegisterEmployees />}
    </div>
  );
}

export default Company;
