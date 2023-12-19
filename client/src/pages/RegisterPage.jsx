import { useState, useRef, useEffect } from "react";
import "../css/LoginPage.css";
import { Button } from "react-bootstrap";
//import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function RegisterPage(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    role: "user",
  });
  //const [message, setMessage] = useState(null);
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
    console.log('sign-up handleSubmit, username: ')
    console.log(user.username)
    e.preventDefault()

    //request to server to add a new username/password
    axios.post('http://127.0.0.1:8080/api/users/register', {
        username: this.state.username,
        password: this.state.password
    })
        .then(response => {
            console.log(response)
            if (!response.data.errmsg) {
                console.log('successful signup')
                this.setState({ //redirect to login page
                    redirectTo: '/login'
                })
            } else {
                console.log('username already taken')
            }
        }).catch(error => {
            console.log('signup error: ')
            console.log(error)

        })
  };

  return (
    <div className="RegisterPage">
      {/* {message ? <Message message={message} /> : null} */}
      <form>
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
        <Button variant="outline-dark" onClick={handleSubmitRegister}>
          Register
        </Button>
      </form>
    </div>
  );
}