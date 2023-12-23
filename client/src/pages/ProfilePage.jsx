import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import { Icon } from "@iconify/react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

export default function ProfilePage({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const userInBrowser = JSON.parse(localStorage.getItem("user"));
    if (userInBrowser) {
      setUser(userInBrowser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Change clicked");

    axios
      .put(`http://127.0.0.1:8080/api/users/update/${user._id}`, {
        // _id:user._id,
        email: user.email,
        password: user.password,
        username: user.username,
        //isLoggedIn: user.isLoggedIn,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.errmsg) {
          //set isLoggedIn for frontend
          console.log("Update response", response.data)
          //localStorage.setItem("user", JSON.stringify(response.data.data));
          setUser({ ...user, isLoggedIn: true });
          console.log("successful UPDATED");
          //navigate("/login");
          // this.setState({ //redirect to login page
          // 	redirectTo: '/login'
          // })
        }
        // else {
        //   console.log("Error");
        //   setUser({ ...user, isLoggedIn: false });
        // }
      })
      .catch((error) => {
        console.log("Update error: ");
        console.log(error);
      });
  };

  return (
    <div>
      <Form>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalUsername"
        >
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="username"
              placeholder={user.username}
              name="username"
              onChange={handleChange}
              value={user.username}
            />
          </Col>
          {/* <Col sm={2}>
            <Button variant="dark" type="submit" onClick={handleClick}>
              Change
            </Button>
          </Col> */}
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="email"
              placeholder={user.email}
              name="email"
              onChange={handleChange}
              value={user.email}
            />
          </Col>
          {/* <Col sm={2}>
            <Button variant="dark" type="submit" onClick={handleClick}>
              Change
            </Button>
          </Col> */}
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="password"
              onChange={handleChange}
              value={user.password}
            />
          </Col>
          {/* <Col sm={2}>
            <Button variant="dark" type="submit" onClick={handleClick}>
              Change
            </Button>
          </Col> */}
        </Form.Group>

        <Button variant="dark" type="submit" onClick={handleClick}>
          Change
        </Button>
      </Form>

      {/* <InputField
        name="username"
        htmlFor="username"
        placeholder="Username"
        id="username"
        type="text"
      />
      <Button variant="dark">Change</Button>
      <InputField
        name="email"
        htmlFor="email"
        placeholder="Email"
        id="email"
        type="email"
      />
      <Button variant="dark">Change</Button>
      <InputField
        name="password"
        htmlFor="password"
        placeholder="Password"
        id="password"
        type="password"
      />
      <Link to="/password-reset">
        <Button variant="dark">Change</Button>
      </Link> */}
      <br />
      <div>
        <Icon
          className="back-btn"
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
