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
        path: "successful-booking",
        element: <SuccessfulBooking />,
      },
      {
        path: "my-booking",
        element: <MyBookings />,
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
]);

export default router;
