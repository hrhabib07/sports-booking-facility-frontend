import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { logout } from "../../../../redux/auth/authSlice";
import { toast } from "sonner";
import { Menu, Layout } from "antd";

const { Sider, Content } = Layout;

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logged out successfully");
    navigate("/");
  };

  return (
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
          <Menu.Item key="4">
            <Link to="">
              <span className="text-gray-600 hover:text-custom-blue">
                Dashboard
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="my-booking">
              <span className="text-gray-600 hover:text-custom-blue">
                My Booking
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
              onClick={handleLogout}
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
            {/* This menu will appear only on small screens */}
            <Menu mode="horizontal" className="w-full">
              <Menu.Item key="4">
                <Link to="">
                  <span className="text-gray-600 hover:text-custom-blue">
                    Dashboard
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="my-booking">
                  <span className="text-gray-600 hover:text-custom-blue">
                    My Booking
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
                  onClick={handleLogout}
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
  );
};

export default UserDashboard;
