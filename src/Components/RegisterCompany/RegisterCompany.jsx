import React, { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import EditCompanyModal from "../Modals/EditCompanyModal/EditCompanyModal";
import { companyData } from "../../Store/companySlice";

function RegisterCompany() {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const companyDetails = useSelector((state) => state.companyData);
  const userDetails = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

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
          userDetails.userType === "admin"
            ? userDetails?._id
            : userDetails?.adminId,
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

  const handleShow = () => {
    setShow(!show);
  };

  const getCompany_url = `${BASE_URL}getcompany`;

  const handleCompanyDetails = async () => {
    const data = {
      adminId:
        userDetails?.userType === "admin"
          ? userDetails?._id
          : userDetails?.adminId,
    };

    await axios
      .post(getCompany_url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch(companyData(res.data.companyData));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!companyDetails) {
      handleCompanyDetails();
    }
  }, [handleCompanyDetails]);
  return (
    <>
      {!companyDetails ? (
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
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center gap-2 fs-5 company-headingText">
            <div>{companyDetails?.name}</div>
            <MdModeEditOutline
              size={"20px"}
              color="#44ce42"
              onClick={handleShow}
            />
          </div>
          <div className="text-center mb-4">
            <a target="_blank" href={companyDetails?.url}>
              {companyDetails?.url}
            </a>
          </div>
          <EditCompanyModal
            handleShow={handleShow}
            show={show}
            handleCompanyDetails={handleCompanyDetails}
          />
          <hr />
        </>
      )}
    </>
  );
}

export default RegisterCompany;
