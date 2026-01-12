import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/authContextHook";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
