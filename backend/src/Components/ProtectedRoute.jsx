// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // If no token, redirect to /login and save the attempted URL
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Otherwise render the protected component
  return children;
};

export default ProtectedRoute;
