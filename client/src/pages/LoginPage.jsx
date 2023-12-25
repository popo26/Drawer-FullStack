import { useState, useEffect } from "react";
//import InputField from "../components/InputField";
import "../css/LoginPage.css";
import { Alert, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_d.png";
import { useUserContext } from "../context/UserContext";

// export default function LoginPage({ user, setUser }) {
export default function LoginPage() {
  // const [user, setUser] = useState({
  //   email: "",
  //   password:"",
  //   isLoggedIn:false,
  // });

  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  //console.log("user in Login", user)

  // useEffect(() => {
  //   const userInBrowser = JSON.parse(localStorage.getItem("user"));
  //   if (userInBrowser) {
  //     setUser(userInBrowser);
  //   }
  // }, []);

  const handleChange = (e) => {
    setMessage("");
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("LoginBtn clicked");

    axios
      .post("http://127.0.0.1:8080/api/users/login", {
        email: user.email,
        password: user.password,
        //isLoggedIn: user.isLoggedIn,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.errmsg) {
          //set isLoggedIn for frontend
          setUser({ ...user, isLoggedIn: true });
          localStorage.setItem("user", JSON.stringify(response.data));

          console.log("successful signup");
          navigate("/home");
          //navigate(0);
        } else {
          console.log("email already taken");
          setUser({ ...user, isLoggedIn: false });
        }
      })
      .catch((error) => {
        console.log("login error: ");
        console.log(error);
        setMessage("Invalid email or password");
      });
  };

  return (
    <div className="LoginPage">
      <div>
        <img src={logo} width="100rem" />
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label hidden>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label hidden>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {/* <a href="#">Don't remember?</a> */}
        </Form.Group>
        {/* <Form.Text className="text-muted" >{message}</Form.Text><br/> */}
        {message && <Alert variant="danger">{message}</Alert>}

        <Button variant="dark" type="submit" onClick={handleClick}>
          Login
        </Button>
      </Form>
    </div>
  );

  // return (
  //   <div className="LoginPage">
  //     <form>
  //       <input
  //         type="email"
  //         name="email"
  //         placeholder="Email"
  //         id="email"
  //         value={user.email}
  //         onChange={handleChange}
  //       />
  //       <br />
  //       <input
  //         type="password"
  //         name="password"
  //         placeholder="Password"
  //         id="password"
  //         value={user.password}
  //         onChange={handleChange}
  //       />
  //       <Button variant="outline-dark" onClick={handleClick}>
  //         Login
  //       </Button>
  //     </form>
  //     <a href="#">Don't remember?</a>
  //     <br />
  //     <a>
  //       <Button variant="dark">Sign Up</Button>
  //     </a>
  //   </div>
  // );
}

////////ORIGINAL////////////////////////////////////////////
// import { useState } from "react";
// import InputField from "../components/InputField";
// import "../css/LoginPage.css";
// import { Button } from "react-bootstrap";

// export default function LoginPage() {
//   const [loginDetails, setLoginDetails] = useState({
//     username: "",
//     password:""
//   });

//   const handleClick = (e) => {
//     e.preventDefault();
//     console.log("LoginBtn clicked");
//   };

//   return (
//     <div className="LoginPage">
//       <form>
//         <InputField
//           htmlFor="username"targetDrawer
//           type="text"
//           name="username"
//           placeholder="username"
//           id="username"
//           value={loginDetails.username}
//         /><br/>
//         <InputField
//           htmlFor="password"
//           type="password"
//           name="password"
//           placeholder="password"
//           id="password"
//           value={loginDetails.password}
//         />
//         <Button variant="outline-dark" onClick={handleClick}>Login</Button>
//       </form>
//       <a href="#">Don't remember?</a>
//       <br/>
//       <a><Button variant="dark">Sign Up</Button></a>
//     </div>
//   );
// }
