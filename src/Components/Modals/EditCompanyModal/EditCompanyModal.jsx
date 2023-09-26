import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditCompanyModal({ handleShow, show, handleCompanyDetails }) {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 1000, theme: "colored", type: type });

  const userDetails = useSelector((state) => state.userData);
  const [editForm, setEditForm] = useState({
    name: userDetails.companyData.name,
    url: userDetails.companyData.url,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const editCompany_url = `${BASE_URL}updatecompanydetails/${userDetails.companyData._id}`;

  const handleEdit = async () => {
    if (
      editForm.name !== userDetails.companyData.name ||
      editForm.url !== userDetails.companyData.url
    ) {
      const data = {
        name: editForm.name,
        url: editForm.url,
      };

      await axios
        .put(editCompany_url, data)
        .then((res) => {
          if (res.data.status) {
            notify("Company details updated successfully", "success");
            handleCompanyDetails();
            handleShow();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleShow();
    }
  };

  return (
    <Modal show={show} onHide={handleShow} size="lg">
      <Modal.Body>
        <div className="row">
          <div className="col-12 col-lg-6 col-xl-6">
            <FloatingLabel
              controlId="floatingInput"
              label="Company Name"
              className="m-2"
            >
              <Form.Control
                type="text"
                name="name"
                placeholder="company name"
                value={editForm.name}
                onChange={handleChange}
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
                value={editForm.url}
                type="text"
                name="url"
                placeholder="company url"
                onChange={handleChange}
              />
            </FloatingLabel>
          </div>
        </div>
        <div className="text-center mt-2">
          <button className="custom-btn rounded-2" onClick={handleEdit}>
            Update
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditCompanyModal;
