import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({
  redirectPath = "/login",
  roles,
  children,
  isUserLoggedIn,
  ...rest
}) {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  //Not working
  if (isAuthenticated && !roles == user.role) {
    console.log("user role", user.role);
    return <Navigate to="/home" />;
  }

  return children ? children : <Outlet />;
}
