import React from "react";
import "./Company.css";
import RegisterCompany from "../../Components/RegisterCompany/RegisterCompany";
import RegisterEmployees from "../../Components/RegisterEmployees/RegisterEmployees";
import { useSelector } from "react-redux";

function Company() {
  const companyDetails = useSelector((state) => state.companyData);
  const userDetails = useSelector((state) => state.userData);

  return (
    <div className="row mt-5 mx-2">
      {userDetails.userType === "Admin" && <RegisterCompany />}
      {companyDetails && <RegisterEmployees />}
    </div>
  );
}

export default Company;
