import { Button } from "antd";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <div className="text-6xl font-bold text-red-500">403</div>
      <p className="text-lg text-gray-500 mt-4">
        Unauthorized Access: You don't have permission to view this page.
      </p>
      <img
        src="https://example.com/unauthorized-illustration.png"
        alt="Unauthorized Access"
        className="w-1/2 mt-8"
      />
      <div className="mt-8">
        <Link to="/login">
          <Button type="primary" size="large" className="mr-4">
            Login
          </Button>
        </Link>
        <Link to="/">
          <Button size="large">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
//
