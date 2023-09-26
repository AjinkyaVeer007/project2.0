import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import {activeData} from "../../Store/activeSlice"
import axios from "axios"
import {toast} from "react-toastify"
import {userData} from "../../Store/userSlice"

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  // for notification
  const notify = (notification, type) =>
  toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const handleForm = (e) => {
    const {name, value} = e.target
    setRegisterForm({...registerForm, [name]: value})
  }

  const BASE_URL = process.env.REACT_APP_BASE_URL

  const register_Url = `${BASE_URL}register`

  const handleRegister = async () => {
    if(registerForm.name.length && registerForm.email.length && registerForm.password.length){
      const data = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        userType: "admin"
      }
      await axios.post(register_Url, data).then((res) => {
        if(res.data.status){
          dispatch(
            userData({
              name: "userData",
              value: res.data.user
            })
          )
          dispatch(
            activeData({
              name: "sidebarActiveItem",
              value: "#$dashboard",
            })
          );
          setRegisterForm({
            name: "",
            email: "",
            password: ""
          })
          navigate("/auth/admin/dashboard/welcome")
        }
      }).catch((err) => {
        console.log(err);
        notify(err.response.data, "error")
      })
    } else{
      notify("All fields are mandatory", "info")
    }
  };

  return (
    <Card className="registerPage col-lg-4 col-md-4 col-10">
      <Card.Body>
        <h4 className="fw-bold mb-3">Register</h4>
        <FloatingLabel
          controlId="floatingname"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="name"
            placeholder="name"
            onChange={handleForm}
            value={registerForm.name}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingemail"
          label="Email"
          className="mb-3"
        >
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleForm}
            value={registerForm.email}
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-4"
          controlId="floatingPassword"
          label="Password"
        >
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleForm}
            value={registerForm.password}
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
