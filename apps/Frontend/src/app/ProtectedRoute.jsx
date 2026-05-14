import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, AllowRole }) {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) return <Navigate to="/login" />;

  if (!userData?.roles?.includes(AllowRole)) {
    console.warn("Access Denied: User does not have required role:", AllowRole);
    return <Navigate to="/main/dashboard/unauthorized" />;
  }
  return children;
}

export default ProtectedRoute;
