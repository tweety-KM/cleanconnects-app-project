import { createBrowserRouter, Navigate } from "react-router-dom";
import RoleSelect from "../pages/RoleSelect";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import BookingNew from "../pages/BookingNew";
import Verification from "../pages/Verification";
import CleanerSelect from "../pages/CleanerSelect";
import RequireVerified from "../components/RequireVerified";

export const router = createBrowserRouter([
  // ✅ Redirect /index.html to /
  { path: "/index.html", element: <Navigate to="/" replace /> },

  { path: "/", element: <RoleSelect /> },
  { path: "/signup/:role", element: <Signup /> },
  { path: "/verification", element: <Verification /> },

  {
    element: <RequireVerified />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/book/new", element: <BookingNew /> },
      { path: "/cleaners", element: <CleanerSelect /> },
    ],
  },

  // ✅ Catch-all: send unknown routes home (prettier than a React Router 404)
  { path: "*", element: <Navigate to="/" replace /> },
]);
