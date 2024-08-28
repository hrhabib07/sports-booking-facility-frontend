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
import UserDashboard from "../components/ui/Dashboard/userDashboard/UserDashboard";
import ProfileInfo from "../components/ui/Dashboard/shared/ProfileInfo/ProfileInfo";
import DashBoardHome from "../components/ui/Dashboard/shared/DashBoardHome/DashBoardHome";
import FacilityListPage from "../pages/FacilityListPage";
import FacilityDetailsPage from "../pages/FacilityDetailsPage";
import ErrorPage from "../pages/ErrorPage";
import RoleBasedRoute from "../auth/RoleBasedRoute";
import AdminDashboard from "../components/ui/Dashboard/adminDashboard/AdminDashboard";
import AllBooking from "../components/ui/Dashboard/adminDashboard/AllBooking";
import AdminBookingDetails from "../components/ui/Dashboard/adminDashboard/AdminBookingDetails";
import CreateFacility from "../components/ui/Dashboard/adminDashboard/CreateFacility";
import CreateAdmin from "../components/ui/Dashboard/adminDashboard/CreateAdmin";

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
        path: "booking",
        element: (
          <RoleBasedRoute requiredRole="user">
            <BookingPage />
          </RoleBasedRoute>
        ),
      },
      // {
      //   path: "booking",
      //   element: <BookingPage />,
      // },

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
            path: "booking-details/:bookingId",
            element: <AdminBookingDetails />,
          },
          {
            path: "all-booking",
            element: <AllBooking />,
          },
          {
            path: "create-facility",
            element: <CreateFacility />,
          },
          {
            path: "create-admin",
            element: <CreateAdmin />,
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
