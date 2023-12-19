import { useState, useContext } from "react";
// import InputField from "../components/InputField";
import "../css/LoginPage.css";
import { Button } from "react-bootstrap";
import AuthService from "../services/AuthService";
import Message from "../components/Message"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function LoginPage(props, {isUserLoggedIn, setIsUserLoggedIn}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  // const handleSubmitLogin = (e) => {
  //   e.preventDefault();
  //   AuthService.login(user).then((data) => {
  //     console.log("data", data)
  //     // const { isAuthenticated, user, message } = data;
  //     if (data.isAuthenticated) {
  //       authContext.setUser(data.user);
  //       authContext.setIsAuthenticated(data.isAuthenticated);
  //       //Check this
  //       props.history.push("/home");
  //     } else {
  //       setMessage(message);
  //     }
  //   });
  // };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      // const { isAuthenticated, user, message } = data;
      const { isAuthenticated, user, message, token } = data;

      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        //Check this
        // props.history.push("/home");
        sessionStorage.setItem('token', token)
        setIsUserLoggedIn(true)
        console.log("isUserLoggedIn", isUserLoggedIn)
        // localStorage.setItem("user", JSON.stringify(user));

        navigate("/home")
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div className="LoginPage">
      {message? <Message message={message}/>: null}
      <form>
        <input
          type="email"
          // type="text"
          name="email"
          placeholder="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button variant="outline-dark" onClick={handleSubmitLogin}>
          Login
        </Button>
      </form>
      <a href="#">Don't remember?</a>
      <br />
      <a>
        <Button variant="dark">Register</Button>
      </a>
    </div>
  );
}

/////ORIGINAL////////////////////////////////////////////////////
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
