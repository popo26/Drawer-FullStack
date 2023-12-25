import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function UnPrivateRoute({
  redirectPath = "/home",
  children,
  // user,
  ...rest
}) {
  const { user } = useUserContext();

  if (user) {
    if (user.isLoggedIn) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children ? children : <Outlet />;
}
