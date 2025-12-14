// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // Still checking auth state
  if (loading) return <div className="p-6 text-center">Loading...</div>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // If route requires specific roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
