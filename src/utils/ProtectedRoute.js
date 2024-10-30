import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useContext(AuthContext); // Replace with your actual authentication logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
