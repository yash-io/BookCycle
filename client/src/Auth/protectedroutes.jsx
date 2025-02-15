import { Navigate, Outlet } from "react-router-dom";
import useAuthDetails from "../store/auth-details";

const ProtectedRoute = () => {
  const { user } = useAuthDetails(); // Get user from Zustand store

  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
