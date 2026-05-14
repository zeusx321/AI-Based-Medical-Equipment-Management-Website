import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, AllowRole }) {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);

  if (!userData) return <Navigate to="/login" />;

  if (!userData?.roles?.includes(AllowRole)) {
    return <Navigate to="/main/dashboard/unauthorized" />;
  }
  return children;
}

export default ProtectedRoute;
