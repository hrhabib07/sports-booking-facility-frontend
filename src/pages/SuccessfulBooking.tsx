import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const SuccessfulBooking = () => {
  const location = useLocation();
  const { bookingId } = location.state || {};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r p-4 from-blue-500 to-purple-600 text-white">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-custom-blue mb-4">
          🎉 Congratulations!
        </h1>
        <p className="text-lg font-medium text-gray-700">
          Your booking has been successfully confirmed.
        </p>
        <p className="text-md text-gray-600 mt-2">
          Booking ID: <span className="font-semibold">{bookingId}</span>
        </p>
        <div className="mt-8 flex justify-between gap-4">
          <Link to={"/home"}>
            <Button className="w-full bg-red-500 text-white p-2 rounded hover:text-red-500 hover:bg-white border border-red-500 transition-all duration-300">
              Go to Home
            </Button>
          </Link>
          <Button className="w-full bg-custom-blue text-white p-2 rounded hover:text-custom-blue hover:bg-white border border-custom-blue transition-all duration-300">
            <Link to={"/user-dashboard/my-booking"}>Show My Booking</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulBooking;
