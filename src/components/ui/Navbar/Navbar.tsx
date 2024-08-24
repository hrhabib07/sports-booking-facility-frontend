import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/auth/authSlice";

const Navbar = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-blue-50">
      <div className="h-16   flex justify-between items-center">
        <div className="flex items-center ml-4">
          <img
            src="https://i.ibb.co/0KCLL9m/sport-Line-without-bg.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }} // Adjust the size as needed
          />
        </div>
        <div>
          <ul className="flex gap-4 me-4">
            <Link to={""}>
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
                Home
              </li>
            </Link>
            <Link to={"booking"}>
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
                Booking
              </li>
            </Link>
            <Link to={"contact"}>
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
                Contact
              </li>
            </Link>
            {!auth.token ? (
              <Link to={"login"}>
                <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
                  Login
                </li>
              </Link>
            ) : (
              <button
                onClick={() => dispatch(logout())}
                className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue"
              >
                <span className="flex gap-1 items-center">
                  Logout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
