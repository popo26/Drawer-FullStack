import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function UnPrivateRoute({
  redirectPath = "/home",
  children,
  ...rest
}) {
  const {isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
