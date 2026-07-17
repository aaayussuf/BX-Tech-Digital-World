import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useContext(AuthContext);

  if (isLoading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return children;
}

