import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";


export default function PrivateRoute({
  redirectPath = "/login",
  roles,
  children,
  user,
  setUser,
  ...rest
}) {

  // useEffect(() => {
  //   const userInBrowser = JSON.parse(localStorage.getItem("user"));
  //   console.log("user in Scribble List", userInBrowser);
  //   if (userInBrowser) {
  //     setUser(userInBrowser);
  //   }
  // }, []);

  const userInBrowser = JSON.parse(localStorage.getItem("user"));
  console.log("User in Private route", user.isLoggedIn)

// if (userInBrowser){
//   // if (!user.isLoggedIn) {
//     if (!userInBrowser.isLoggedIn) {

//     return <Navigate to={redirectPath} replace />;
//   }
// }

if (userInBrowser === null || !userInBrowser.isLoggedIn) {
  return <Navigate to={redirectPath} replace />;
}

  // // if (!user.isLoggedIn) {
  //   if (!userInBrowser.isLoggedIn) {

  //     return <Navigate to={redirectPath} replace />;
  //   }



  //Not working
  // if (user.isLoggedIn && !roles == user.role) {
  //   console.log("user role", user.role);
  //   return <Navigate to="/home" />;
  // }

  return children ? children : <Outlet />;
}
