// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role?: string; // optional: restrict role
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const userRole = localStorage.getItem("ROLE");

  if (!token) {
    return <Navigate to="/Loginpage" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
