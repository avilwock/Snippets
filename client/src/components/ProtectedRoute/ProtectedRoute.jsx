import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header/Header";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
