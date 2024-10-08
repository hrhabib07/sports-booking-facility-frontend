import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../redux/hooks";
import { Card, Typography, Button } from "antd";
import { verifyToken } from "../../../../../utils/verifyToken";

const { Title, Paragraph } = Typography;

const DashBoardHome = () => {
  const auth = useAppSelector((state) => state.auth);
  const user = auth.user as {
    name: string;
  } | null;

  const verifiedToken = verifyToken(auth?.token as string);
  const userRole = verifiedToken?.role;

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <Title level={2} className="text-center text-blue-600">
          Welcome, {user?.name}!
        </Title>
        <Paragraph className="text-center text-lg">
          We're glad to have you back.
        </Paragraph>
        <div className="mt-6 flex flex-col items-center">
          {userRole === "user" && (
            <Link to={"my-booking"}>
              <Button type="primary" className="mb-4 w-full max-w-xs">
                View My Bookings
              </Button>
            </Link>
          )}
          {userRole === "admin" && (
            <Link to={"all-booking"}>
              <Button type="primary" className="mb-4 w-full max-w-xs">
                Show all Bookings
              </Button>
            </Link>
          )}
          <Link to={"profile-info"}>
            <Button type="default" className="w-full max-w-xs">
              Profile Information
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default DashBoardHome;
