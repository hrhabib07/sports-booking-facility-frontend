import { useAppSelector } from "../../../../../redux/hooks";
// import { TUserData } from "../../../../types/auth.type";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const ProfileInfo = () => {
  const auth = useAppSelector((state) => state.auth);
  const user = auth.user as {
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null;

  if (!user) {
    return <p>Loading...</p>; // Or handle the case where the user is null
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <Title level={2} className="text-center text-blue-600">
          Profile Information
        </Title>
        <Paragraph className="text-center text-lg">
          Hello, {user.name}
        </Paragraph>
        <div className="mt-4">
          <Paragraph>
            <strong>Email:</strong> {user.email}
          </Paragraph>
          <Paragraph>
            <strong>Mobile number:</strong> {user.phone}
          </Paragraph>
          <Paragraph>
            <strong>Address:</strong> {user.address}
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default ProfileInfo;
