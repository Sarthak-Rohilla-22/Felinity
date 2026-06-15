import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./contexts/AuthContext";

function SignedOutProtectedRoute() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}

export default SignedOutProtectedRoute;
