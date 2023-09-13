import React from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/admin/dashboard/welcome");
  };
  return (
    <>
      <Card className="loginPage col-lg-4 col-md-4 col-10">
        <Card.Body>
          <h4 className="fw-bold mb-3">Login</h4>
          <FloatingLabel
            controlId="floatingInput"
            label="Employee Id"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            className="mb-4"
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button onClick={handleLogin} className="mb-2" variant="primary">
            Login
          </Button>
          <div>
            Don't have account ?{" "}
            <span
              className="text-primary"
              onClick={() => {
                navigate("/register");
              }}
              style={{ cursor: "pointer" }}
            >
              Register then..!
            </span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;
