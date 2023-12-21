import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({
  redirectPath = "/login",
  roles,
  children,
  user,
  ...rest
}) {
  if (!user.isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  //Not working
  if (user.isLoggedIn && !roles == user.role) {
    console.log("user role", user.role);
    return <Navigate to="/home" />;
  }

  return children ? children : <Outlet />;
}
