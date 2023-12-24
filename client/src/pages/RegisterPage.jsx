import { useState, useRef, useEffect } from "react";
import "../css/LoginPage.css";
import { Button, Form, Alert } from "react-bootstrap";
//import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo_d.png";

// export default function RegisterPage(props, {user, setUser}) {
export default function RegisterPage({ user, setUser }) {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    username: "",
    role: "user",
    isLoggedIn: false,
  });
  //const [message, setMessage] = useState(null);
  let timerID = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userInBrowser = JSON.parse(localStorage.getItem("user"));
    if (userInBrowser) {
      setUser(userInBrowser);
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const handleChange = (e) => {
    setMessage("")
    //console.log(e.target.value)
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
    console.log(userForm);
  };

  const resetForm = () => {
    setUserForm({
      username: "",
      password: "",
      email: "",
    });
  };

  const handleSubmitRegister = (e) => {
    console.log("sign-up handleSubmit, username: ");
    console.log(userForm.username);
    e.preventDefault();

    //request to server to add a new username/password
    axios
      .post("http://127.0.0.1:8080/api/users/register", {
        username: userForm.username,
        email: userForm.email,
        password: userForm.password,
        role: "user",
        isLoggedIn: false,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          resetForm();
          timerID = setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          console.log("username already taken");
          setMessage("That email address is taken.")

        }
      })
      .catch((error) => {
        console.log("signup error: ");
        console.log(error);
        setMessage("Signup Error.")
      });
  };

  return (
    <div className="RegisterPage">
      {/* {message ? <Message message={message} /> : null} */}
      <div className="LoginPage">
        <div>
          <img src={logo} width="100rem" />
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label hidden>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={userForm.username}
              name="username"
              onChange={handleChange}
            />
     
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label hidden>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={userForm.email}
              name="email"
              onChange={handleChange}
            />
            {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label hidden>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={userForm.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            {/* <a href="#">Don't remember?</a> */}
          </Form.Group>
          {message && <Alert variant="danger" >{message}</Alert>}
          <Button variant="dark" type="submit" onClick={handleSubmitRegister}>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );

  // return (
  //   <div className="RegisterPage">
  //     {/* {message ? <Message message={message} /> : null} */}
  //     <form>
  //       <input
  //         type="text"
  //         name="username"
  //         placeholder="username"
  //         id="username"
  //         value={userForm.username}
  //         onChange={handleChange}
  //       />
  //       <input
  //         type="email"
  //         name="email"
  //         placeholder="email"
  //         id="email"
  //         value={userForm.email}
  //         onChange={handleChange}
  //       />
  //       <br />
  //       <input
  //         type="password"
  //         name="password"
  //         placeholder="password"
  //         id="password"
  //         value={userForm.password}
  //         onChange={handleChange}
  //       />
  //       <Button variant="outline-dark" onClick={handleSubmitRegister}>
  //         Register
  //       </Button>
  //     </form>
  //   </div>
  // );
}
