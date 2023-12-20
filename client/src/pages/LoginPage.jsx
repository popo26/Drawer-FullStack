
import { useState } from "react";
//import InputField from "../components/InputField";
import "../css/LoginPage.css";
import { Button } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginPage({user, setUser}) {
  // const [user, setUser] = useState({
  //   email: "",
  //   password:"",
  //   isLoggedIn:false,
  // });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("LoginBtn clicked");

    axios.post('http://127.0.0.1:8080/api/users/login', {
			email: user.email,
			password: user.password,
      //isLoggedIn: user.isLoggedIn,
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
          //setUser({...user, isLoggedIn:true})
          localStorage.setItem("user", JSON.stringify(response.data))

					console.log('successful signup')
          navigate("/home")
					// this.setState({ //redirect to login page
					// 	redirectTo: '/login'
					// })
				} else {
					console.log('email already taken')
          setUser({...user, isLoggedIn:false})

				}
			}).catch(error => {
				console.log('login error: ')
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
