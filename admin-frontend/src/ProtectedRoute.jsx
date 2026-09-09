import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const adminUser = localStorage.getItem("adminUser");

  if (!token || !adminUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(adminUser);

  if (user.role !== "admin") {
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;