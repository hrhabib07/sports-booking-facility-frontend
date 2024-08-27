import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/auth/authSlice";
import { toast, Toaster } from "sonner";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logged out successfully");
    navigate("/");
  };
  return (
    <div>
      <Toaster></Toaster>
      <h1>Hello, From AdminDashboard!</h1>

      <button
        onClick={handleLogout}
        className="text-left text-gray-600 w-full hover:text-custom-blue"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
