import { createBrowserRouter } from "react-router-dom";
import AppShell from "../components/AppShell";
import RoleSelect from "../pages/RoleSelect";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import BookingNew from "../pages/BookingNew";
import Verification from "../pages/Verification";
import Profile from "../pages/Profile";
import CleanerSelect from "../pages/CleanerSelect";
import ConfirmBooking from "../pages/ConfirmBooking";
import RequireVerified from "../components/RequireVerified";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <RoleSelect /> },
      { path: "/signup/:role", element: <Signup /> },
      { path: "/verification", element: <Verification /> },

      {
        element: <RequireVerified />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/book/new", element: <BookingNew /> },
          { path: "/cleaners", element: <CleanerSelect /> },
          { path: "/confirm", element: <ConfirmBooking /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
]);
