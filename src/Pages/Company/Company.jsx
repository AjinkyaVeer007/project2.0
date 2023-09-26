import React, { useEffect, useState } from "react";
import "./Company.css";
import { MdModeEditOutline } from "react-icons/md";
import RegisterCompany from "../../Components/RegisterCompany/RegisterCompany";
import RegisterEmployees from "../../Components/RegisterEmployees/RegisterEmployees";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { userData } from "../../Store/userSlice";
import EditCompanyModal from "../../Components/Modals/EditCompanyModal/EditCompanyModal";

function Company() {
  const userDetails = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getCompany_url = `${BASE_URL}getcompany`;

  const handleCompanyDetails = async () => {
    const data = {
      adminId:
        userDetails.userData.userType === "admin"
          ? userDetails.userData._id
          : userDetails.userData.adminId,
    };

    await axios
      .post(getCompany_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(
            userData({
              name: "companyData",
              value: res.data.companyData,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!userDetails.companyData) {
      handleCompanyDetails();
    }
  }, []);

  return (
    <div className="row mt-5 mx-2">
      {!userDetails.companyData && <RegisterCompany />}
      <div className="d-flex align-items-center justify-content-center gap-2 fs-5 company-headingText">
        <div>{userDetails.companyData?.name}</div>
        <MdModeEditOutline size={"20px"} color="#44ce42" onClick={handleShow} />
      </div>
      <a
        className="text-center mb-4"
        target="_blank"
        href="www.magnitesolutions.com"
      >
        {userDetails.companyData?.url}
      </a>
      <EditCompanyModal
        handleShow={handleShow}
        show={show}
        handleCompanyDetails={handleCompanyDetails}
      />
      <hr />
      <RegisterEmployees />
    </div>
  );
}

export default Company;
