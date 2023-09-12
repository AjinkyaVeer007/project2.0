import React from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";

function Register() {

  const handleRegister = () => {
    console.log("Clicked");
  };

  return (
    <Card className="registerPage col-lg-4 col-md-4 col-10">
      <Card.Body>
        <h4 className="fw-bold mb-3">Register</h4>
        <FloatingLabel
          controlId="floatingemail"
          label="Employee Id"
          className="mb-3"
        >
          <Form.Control
            type="text"
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
      </Card.Body>
    </Card>
  );
}

export default Register;
