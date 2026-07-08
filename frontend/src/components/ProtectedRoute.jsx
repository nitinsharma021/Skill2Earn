import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  providerOnly = false,
}) {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {

    return <Navigate to="/login" replace />;

  }

  if (providerOnly && user.role !== "provider") {

    return <Navigate to="/" replace />;

  }

  return children;

}