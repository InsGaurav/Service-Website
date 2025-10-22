import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const { exp, role } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return <Navigate to="/" replace />; // or redirect to unauthorized page
    }
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
