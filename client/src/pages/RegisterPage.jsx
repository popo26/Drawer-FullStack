import { useState, useRef, useEffect } from "react";
import "../css/LoginPage.css";
import { Button } from "react-bootstrap";
import AuthService from "../services/AuthService";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    role: "user",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      email: "",
    });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      console.log("data",data)

      const { message } = data;
      console.log("message", message)
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          // props.history.push("/login");
          navigate("/login")
        }, 2000);
      }
    });
  };

  return (
    <div className="RegisterPage">
      {message ? <Message message={message} /> : null}
      <form >
        <input
          type="text"
          name="username"
          placeholder="username"
          id="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="email"
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
        <Button variant="outline-dark" onClick={handleSubmitRegister}>Register</Button>
      </form>
    </div>
  );
}
