import { createBrowserRouter } from "react-router-dom";
import RoleSelect from "../pages/RoleSelect";
import Signup from "../pages/Signup";
import Verification from "../pages/Verification";
import Dashboard from "../pages/Dashboard";
import RequireVerified from "../components/RequireVerified";
import BookingNew from "../pages/BookingNew";

export const router = createBrowserRouter([
  { path: "/", element: <RoleSelect /> },
  { path: "/signup/:role", element: <Signup /> },
  { path: "/verification", element: <Verification /> },

  // Everything inside this block requires VERIFIED
  {
    element: <RequireVerified />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/book/new", element: <BookingNew /> },
    ],
  },
]);
