import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./contexts/AuthContext";

function SignedInProtectedRoute() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}

export default SignedInProtectedRoute;
