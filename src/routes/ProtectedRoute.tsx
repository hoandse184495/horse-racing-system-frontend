import { Navigate } from "react-router-dom";
import { authService } from "../features/auth/authService";
import type { UserRole } from "../features/auth/authTypes";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const token = authService.getToken();
  const currentUser = authService.getCurrentUser();

  if (!token || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}