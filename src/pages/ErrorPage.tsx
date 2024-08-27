import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = ({
  errorCode = "Error",
  message = "Something went wrong.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <div className="text-6xl font-bold text-custom-blue">{errorCode}</div>
      <p className="text-lg text-gray-500 mt-4">{message}</p>
      <img
        src="https://example.com/error-illustration.png"
        alt="Error"
        className="w-1/2 mt-8"
      />
      <div className="mt-8">
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          Go Back
        </Button>
        <Link to="/">
          <Button size="large">Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
