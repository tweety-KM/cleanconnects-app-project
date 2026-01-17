import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default function RequireVerified() {
  const user = getCurrentUser();

  // Not signed in -> send to start
  if (!user) return <Navigate to="/" replace />;

  // Signed in but not verified -> send to verification page
  if (user.verificationStatus !== "VERIFIED") {
    return <Navigate to="/verification" replace />;
  }

  // Verified -> allow access
  return <Outlet />;
}
