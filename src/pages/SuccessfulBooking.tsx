import { Button } from "antd";
import { Link } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

const SuccessfulBooking = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 text-white">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-xl w-full text-center transform transition-transform hover:scale-105">
        <CheckCircleOutlined style={{ fontSize: "3rem", color: "#38a169" }} />

        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 mt-4">
          🎉 Congratulations!
        </h1>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Your booking has been successfully confirmed.
        </p>
        <p className="text-base text-gray-500 mb-6">
          Thank you for choosing our service. We look forward to serving you!
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Booking Details:
          </h2>
          <p className="text-gray-600">
            <strong>Transaction ID:</strong> 1234-5678-ABCD
          </p>
          <p className="text-gray-600">
            <strong>Payment Amount:</strong> $500.00
          </p>
          <p className="text-gray-600">
            <strong>Booking Date:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="text-gray-600 italic mb-6">
          If you have any questions or need assistance, please contact our
          support team.
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <Link to={"/home"}>
            <Button
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:text-red-500 hover:bg-white border border-red-500 transition-all duration-300"
              style={{ maxWidth: "200px" }}
            >
              Go to Home
            </Button>
          </Link>
          <Link to={"/user-dashboard/my-booking"}>
            <Button
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:text-blue-500 hover:bg-white border border-blue-500 transition-all duration-300"
              style={{ maxWidth: "200px" }}
            >
              Show Booking
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulBooking;
