import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const ProtectedRoute = () => {
  // Skip auth check during development so you can build pages without signing in.
  // import.meta.env.DEV is automatically `false` in production builds.
  if (import.meta.env.DEV) return <Outlet />;

  const { authUser, isLoading } = useAuthContext();

  if (isLoading) return null; // or a loading spinner

  return authUser ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
