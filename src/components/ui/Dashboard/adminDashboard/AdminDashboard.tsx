/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { logout } from "../../../../redux/auth/authSlice";
import { Menu, Layout, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { useState } from "react";

const { Sider, Content } = Layout;
const { confirm } = Modal;

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [setIsModalVisible] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const showLogoutConfirm = () => {
    confirm({
      title: "Are you sure you want to log out?",
      icon: <ExclamationCircleOutlined />,
      content: "You will need to log in again to access your dashboard.",
      onOk() {
        handleLogout();
      },
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    // setIsModalVisible(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Layout className="min-h-screen">
        <Sider
          width={250}
          className="bg-white shadow-md hidden md:block"
          breakpoint="md"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            className="h-full border-r-0"
          >
            <Menu.Item key="1">
              <Link to="">
                <span className="text-gray-600 hover:text-custom-blue">
                  All Facility
                </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="7">
              <Link to="create-facility">
                <span className="text-gray-600 hover:text-custom-blue">
                  Create Facility
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="all-booking">
                <span className="text-gray-600 hover:text-custom-blue">
                  All Booking
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="create-admin">
                <span className="text-gray-600 hover:text-custom-blue">
                  Create Admin
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="profile-info">
                <span className="text-gray-600 hover:text-custom-blue">
                  Profile Info
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <button
                onClick={showLogoutConfirm}
                className="text-left text-gray-600 w-full hover:text-custom-blue"
              >
                Logout
              </button>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="p-2 md:p-6 bg-gray-50">
            <div className="md:hidden mb-4">
              <Menu mode="horizontal" className="w-full">
                <Menu.Item key="4">
                  <Link to="">
                    <span className="text-gray-600 hover:text-custom-blue">
                      Dashboard
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <Link to="all-booking">
                    <span className="text-gray-600 hover:text-custom-blue">
                      All Booking
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="profile-info">
                    <span className="text-gray-600 hover:text-custom-blue">
                      Profile Info
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <button
                    onClick={showLogoutConfirm}
                    className="text-left text-gray-600 w-full hover:text-custom-blue"
                  >
                    Logout
                  </button>
                </Menu.Item>
              </Menu>
            </div>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default UserDashboard;
