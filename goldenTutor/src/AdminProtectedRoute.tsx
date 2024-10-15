import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./stateManager";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
