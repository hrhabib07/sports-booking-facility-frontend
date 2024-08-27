import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ContactPage from "../pages/ContactPage";
import BookingPage from "../pages/BookingPage";
import HomePage from "../pages/HomePage";
import PrivateRoute from "../auth/PrivateRoute";
import BookingConfirmationPage from "../pages/BookingConfirmationPage";
import SuccessfulBooking from "../pages/SuccessfulBooking";
import MyBookings from "../components/ui/MyBookings/MyBookings";
import UserDashboard from "../components/ui/Dashboard/UserDashboard";
import ProfileInfo from "../components/ui/Dashboard/ProfileInfo/ProfileInfo";
import DashBoardHome from "../components/ui/Dashboard/DashBoardHome/DashBoardHome";
import FacilityListPage from "../pages/FacilityListPage";
import FacilityDetailsPage from "../pages/FacilityDetailsPage";
import ErrorPage from "../pages/ErrorPage";
import RoleBasedRoute from "../auth/RoleBasedRoute";
import AdminDashboard from "../components/ui/Dashboard/AdminDashboard";
import AllBooking from "../components/ui/Dashboard/AllBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "confirm-booking",
        element: (
          <PrivateRoute>
            <BookingConfirmationPage />
          </PrivateRoute>
        ),
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "facility-list",
        element: <FacilityListPage />,
      },
      {
        path: "facility-details/:facilityId",
        element: <FacilityDetailsPage />,
      },
      {
        path: "successful-booking",
        element: <SuccessfulBooking />,
      },
      {
        path: "my-booking",
        element: <MyBookings />,
      },
      {
        path: "admin-dashboard",
        element: (
          <RoleBasedRoute requiredRole="admin">
            <AdminDashboard />
          </RoleBasedRoute>
        ),
        children: [
          {
            path: "",
            element: <DashBoardHome />,
          },
          {
            path: "all-booking",
            element: <AllBooking />,
          },
          {
            path: "profile-info",
            element: <ProfileInfo />,
          },
        ],
      },
      {
        path: "user-dashboard",
        element: (
          <RoleBasedRoute requiredRole="user">
            <UserDashboard />
          </RoleBasedRoute>
        ),
        children: [
          {
            path: "",
            element: <DashBoardHome />,
          },
          {
            path: "my-booking",
            element: <MyBookings />,
          },
          {
            path: "profile-info",
            element: <ProfileInfo />,
          },
        ],
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <ErrorPage />, // Display the ErrorPage for 404 errors
  },
]);

export default router;
