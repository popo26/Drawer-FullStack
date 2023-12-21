import { Outlet, Navigate } from "react-router-dom";

export default function UnPrivateRoute({
  redirectPath = "/home",
  children,
  user,
  ...rest
}) {
  if (user) {
    if (user.isLoggedIn) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children ? children : <Outlet />;
}
