import React from "react";
import RegisterCompany from "../Components/RegisterCompany";
import RegisterEmployees from "../Components/RegisterEmployees";
import { useSelector } from "react-redux";

function Company() {
  const companyDetails = useSelector((state) => state.companyData);
  const userDetails = useSelector((state) => state.userData);

  return (
    <div className="row mt-2 mx-2 border rounded p-2 p-lg-3 bg-white">
      {userDetails.userType === "Admin" && <RegisterCompany />}
      {companyDetails && <RegisterEmployees />}
    </div>
  );
}

export default Company;
