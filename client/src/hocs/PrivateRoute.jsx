import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({
  redirectPath = "/login",
  roles,
  children,
  ...rest
}) {
  const userInBrowser = JSON.parse(localStorage.getItem("user"));

  if (userInBrowser === null || !userInBrowser.isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
