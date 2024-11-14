import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const ErrorBooking = () => {
  const location = useLocation();
  const { bookingId } = location.state || {};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r p-4 from-red-500 to-yellow-600 text-white">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ❌ Payment Failed
        </h1>
        <p className="text-lg font-medium text-gray-700">
          Unfortunately, your booking could not be confirmed due to a payment
          issue.
        </p>
        {bookingId && (
          <p className="text-md text-gray-600 mt-2">
            Booking ID: <span className="font-semibold">{bookingId}</span>
          </p>
        )}
        <div className="mt-8 flex justify-between gap-4">
          <Link to={"/booking"}>
            <Button className="w-full bg-yellow-500 text-white p-2 rounded hover:text-yellow-500 hover:bg-white border border-yellow-500 transition-all duration-300">
              Retry Booking
            </Button>
          </Link>
          <Link to={"/home"}>
            <Button className="w-full bg-red-500 text-white p-2 rounded hover:text-red-500 hover:bg-white border border-red-500 transition-all duration-300">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorBooking;
