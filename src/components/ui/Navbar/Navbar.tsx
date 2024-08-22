const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center ml-4">
          <h2 className="text-gray-900">logo</h2>
        </div>
        <div>
          <ul className="flex gap-4 me-4">
            <li className="cursor-pointer hover:bg-gray-100 p-4 text-gray-500 hover:text-black border-b-2 border-transparent  hover:border-black">
              Home
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-4 text-gray-500 hover:text-black border-b-2 border-transparent  hover:border-black">
              Booking
            </li>

            <li className="cursor-pointer hover:bg-gray-100 p-4 text-gray-500 hover:text-black border-b-2 border-transparent  hover:border-black">
              Contact
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-4 text-gray-500 hover:text-black border-b-2 border-transparent  hover:border-black">
              Login
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
