import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeData } from "../../Store/activeSlice";
import { userData } from "../../Store/userSlice";
import { companyData } from "../../Store/companySlice";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const login_Url = `${BASE_URL}login`;

  const handleLogin = async () => {
    if (loginForm.email.length && loginForm.password) {
      const data = {
        email: loginForm.email,
        password: loginForm.password,
      };
      await axios
        .post(login_Url, data)
        .then((res) => {
          if (res.data.status) {
            dispatch(userData(res.data.user));
            dispatch(companyData(res.data.companyData));
            dispatch(
              activeData({
                name: "sidebarActiveItem",
                value: "#$dashboard",
              })
            );
            setLoginForm({
              email: "",
              password: "",
            });
            navigate("/auth/admin/dashboard/welcome");
          }
        })
        .catch((err) => {
          console.log(err);
          notify(err.response.data, "error");
        });
    } else {
      notify("All fields are mandatory", "info");
    }
  };
  return (
    <>
      <Card className="loginPage col-lg-4 col-md-4 col-10">
        <Card.Body>
          <h4 className="fw-bold mb-3">Login</h4>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              value={loginForm.email}
              onChange={handleForm}
              type="email"
              name="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-4"
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control
              value={loginForm.password}
              name="password"
              onChange={handleForm}
              type="password"
              placeholder="Password"
            />
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
