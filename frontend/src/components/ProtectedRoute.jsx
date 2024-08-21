import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.userData.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
