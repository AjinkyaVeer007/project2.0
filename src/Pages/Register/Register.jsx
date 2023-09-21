import React from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import {activeData} from "../../Store/activeSlice"

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = () => {
    dispatch(
      activeData({
        name: "sidebarActiveItem",
        value: "#$dashboard",
      })
    );
    navigate("/auth/admin/dashboard/welcome")
  };

  return (
    <Card className="registerPage col-lg-4 col-md-4 col-10">
      <Card.Body>
        <h4 className="fw-bold mb-3">Register</h4>
        <FloatingLabel
          controlId="floatingemail"
          label="Email"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-4"
          controlId="floatingPassword"
          label="Password"
        >
          <Form.Control
            type="password"
            placeholder="Password"
          />
        </FloatingLabel>
        <Button onClick={handleRegister} className="mb-2" variant="primary">
          Register
        </Button>
        <div>
            Already have an account ?{" "}
            <span
              className="text-primary"
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Login then..!
            </span>
          </div>
      </Card.Body>
    </Card>
  );
}

export default Register;
