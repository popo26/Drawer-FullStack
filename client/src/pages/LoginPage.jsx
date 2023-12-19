
import { useState } from "react";
//import InputField from "../components/InputField";
import "../css/LoginPage.css";
import { Button } from "react-bootstrap";
import axios from 'axios'

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password:""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("LoginBtn clicked");

    axios.post('http://127.0.0.1:8080/api/users/login', {
			email: user.email,
			password: user.password
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
    <div className="LoginPage">
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          value={user.email}
          onChange={handleChange}
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button variant="outline-dark" onClick={handleClick}>Login</Button>
      </form>
      <a href="#">Don't remember?</a>
      <br/>
      <a><Button variant="dark">Sign Up</Button></a>
    </div>
  );
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
