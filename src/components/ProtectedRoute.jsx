import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// TODO: Remove this in production
const DEV_MODE = true;

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (DEV_MODE) {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
