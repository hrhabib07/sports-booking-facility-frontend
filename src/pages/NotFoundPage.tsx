import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <div className="text-6xl font-bold text-custom-blue">404</div>
      <p className="text-lg text-gray-500 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <img
        src="https://example.com/404-illustration.png"
        alt="Not Found"
        className="w-1/2 mt-8"
      />
      <div className="mt-8">
        <Link to="/">
          <Button type="primary" size="large" className="mr-4">
            Go to Home
          </Button>
        </Link>
        <Button size="large">
          <a href="mailto:support@example.com">Contact Support</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
