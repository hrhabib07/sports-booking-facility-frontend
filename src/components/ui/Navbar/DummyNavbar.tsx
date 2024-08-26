import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/auth/authSlice";
import { toast, Toaster } from "sonner";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const DummyNavbar = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logged out successfully");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="bg-blue-50">
      <Toaster />
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
            <li
              onClick={() => setIsProfileDropdownOpen(false)}
              className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue"
            >
              Home
            </li>
          </Link>
          <Link to="/booking">
            <li
              onClick={() => setIsProfileDropdownOpen(false)}
              className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue"
            >
              Booking
            </li>
          </Link>
          <Link to="/contact">
            <li
              onClick={() => setIsProfileDropdownOpen(false)}
              className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue"
            >
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
            <div className="relative z-10">
              <li
                className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue"
                onClick={toggleProfileDropdown}
              >
                My Profile
              </li>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                  <Link to="/my-booking">
                    <li className="px-4 py-2 text-gray-500 hover:bg-blue-50 hover:text-custom-blue">
                      My Booking
                    </li>
                  </Link>
                  <Link to="/profile-info">
                    <li className="px-4 py-2 text-gray-500 hover:bg-blue-50 hover:text-custom-blue">
                      Profile Info
                    </li>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-500 hover:bg-blue-50 hover:text-custom-blue"
                  >
                    Logout
                  </button>
                </div>
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
              <div>
                <li
                  className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent hover:border-custom-blue"
                  onClick={toggleProfileDropdown}
                >
                  My Profile
                </li>
                {isProfileDropdownOpen && (
                  <ul className="flex flex-col gap-2 mt-2 pl-4">
                    <Link to="/my-booking" onClick={toggleMobileMenu}>
                      <li className="text-gray-500 hover:bg-blue-50 hover:text-custom-blue">
                        My Booking
                      </li>
                    </Link>
                    <Link to="/profile-info" onClick={toggleMobileMenu}>
                      <li className="text-gray-500 hover:bg-blue-50 hover:text-custom-blue">
                        Profile Info
                      </li>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="text-left text-gray-500 hover:bg-blue-50 hover:text-custom-blue"
                    >
                      Logout
                    </button>
                  </ul>
                )}
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DummyNavbar;

// import { Link } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { logout } from "../../../redux/auth/authSlice";
// import { toast, Toaster } from "sonner";
// import { useState } from "react";

// const Navbar = () => {
//   const auth = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const handleLogout = () => {
//     dispatch(logout());
//     toast.success("user logged out successfully");
//   };

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   return (
//     <div className="bg-blue-50">
//       <Toaster></Toaster>
//       <div className="h-16   flex justify-between items-center">
//         <div className="flex items-center ml-4">
//           <img
//             src="https://i.ibb.co/0KCLL9m/sport-Line-without-bg.png"
//             alt="Logo"
//             style={{ width: "50px", height: "50px" }} // Adjust the size as needed
//           />
//         </div>
//         <div>
//           <ul className="flex gap-4 me-4">
//             <Link to={""}>
//               <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
//                 Home
//               </li>
//             </Link>
//             <Link to={"booking"}>
//               <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
//                 Booking
//               </li>
//             </Link>
//             <Link to={"contact"}>
//               <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
//                 Contact
//               </li>
//             </Link>
//             {!auth.token ? (
//               <Link to={"login"}>
//                 <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
//                   Login
//                 </li>
//               </Link>
//             ) : (
//               <div>
//                 <h2>My Profile </h2>
//               </div>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
