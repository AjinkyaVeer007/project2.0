import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

function RegisterCompany() {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);

  const [companyForm, setCompanyForm] = useState({
    name: "",
    url: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const registerCompany_url = `${BASE_URL}createcompany`;

  const handleRegisterCompany = async () => {
    if (companyForm.name.length) {
      const data = {
        name: companyForm.name,
        url: companyForm.url.length ? companyForm.url : null,
        adminId:
          userDetails.userData.userType === "admin"
            ? userDetails.userData._id
            : userDetails.userData.adminId,
      };
      await axios
        .post(registerCompany_url, data)
        .then((res) => {
          if (res.data.status) {
            notify("Company Registered Successfully", "success");
            setCompanyForm({
              name: "",
              url: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          notify(err.response.data, "error");
        });
    } else {
      notify("Company name is mandatory", "info");
    }
  };
  return (
    <div className="col-12 mb-4">
      <div className="text-center fs-5 mb-2 company-headingText">
        Register Your Company
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 col-xl-6">
          <FloatingLabel
            controlId="floatingInput"
            label="Company Name"
            className="m-2"
          >
            <Form.Control
              onChange={handleForm}
              value={companyForm.name}
              type="text"
              name="name"
              placeholder="company name"
            />
          </FloatingLabel>
        </div>
        <div className="col-12 col-lg-6 col-xl-6">
          <FloatingLabel
            controlId="floatingInput"
            label="Company URL"
            className="m-2"
          >
            <Form.Control
              onChange={handleForm}
              value={companyForm.url}
              type="text"
              name="url"
              placeholder="company url"
            />
          </FloatingLabel>
        </div>
      </div>
      <div className="text-center mt-2">
        <button
          onClick={handleRegisterCompany}
          className="custom-btn rounded-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default RegisterCompany;
