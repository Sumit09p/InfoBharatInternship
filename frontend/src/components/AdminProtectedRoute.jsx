// src/components/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  // NOT logged in → go to admin login
  if (!user) return <Navigate to="/admin/login" replace />;

  // Logged in but NOT admin
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
