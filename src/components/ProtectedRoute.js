// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../FirebaseConfig';  // Use Firebase for authentication

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;  // Check if the user is logged in

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
