import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { verifyToken } from "../../../utils/verifyToken";

const Navbar = () => {
  const auth = useAppSelector((state) => state.auth);
  const verifiedToken = verifyToken(auth?.token);
  const userRole = verifiedToken?.role;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-blue-50">
      <div className="h-16 flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/0KCLL9m/sport-Line-without-bg.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </div>

        <div className="hidden md:flex gap-4 list-none">
          <Link to="/">
            <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
              Home
            </li>
          </Link>
          <Link to="/booking">
            <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
              Booking
            </li>
          </Link>
          <Link to="/facility-list">
            <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
              See All Facility
            </li>
          </Link>
          <Link to="/contact">
            <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
              Contact
            </li>
          </Link>
          {!auth.token ? (
            <Link to="/login">
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                Login
              </li>
            </Link>
          ) : (
            <div>
              {userRole === "user" ? (
                <Link to={"/user-dashboard"}>
                  <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                    Dashboard
                  </li>
                </Link>
              ) : (
                <Link to={"/admin-dashboard"}>
                  <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                    Dashboard
                  </li>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? (
              <CloseOutlined className="text-custom-blue text-2xl" />
            ) : (
              <MenuOutlined className="text-custom-blue text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4">
            <Link to="/" onClick={toggleMobileMenu}>
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                Home
              </li>
            </Link>
            <Link to="/booking" onClick={toggleMobileMenu}>
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                Booking
              </li>
            </Link>
            <Link to="/contact" onClick={toggleMobileMenu}>
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                Contact
              </li>
            </Link>
            {!auth.token ? (
              <Link to="/login" onClick={toggleMobileMenu}>
                <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                  Login
                </li>
              </Link>
            ) : (
              <Link to={"/user-dashboard"} onClick={toggleMobileMenu}>
                <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue">
                  Dashboard
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
