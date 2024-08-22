import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to={"login"}>
              <li className="cursor-pointer hover:bg-white p-4 text-gray-500 hover:text-custom-blue border-b-2 border-transparent   hover:border-custom-blue">
                Login
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
