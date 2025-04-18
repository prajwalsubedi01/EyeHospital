import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminToken"); // Check for token in localStorage

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />; // Redirect to login if not authenticated
  }

  return children; // Render the children (protected routes) if authenticated
};

export default ProtectedRoute;
