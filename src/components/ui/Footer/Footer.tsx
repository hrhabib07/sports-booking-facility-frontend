import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-custom-blue text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">sportLine</h2>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Created by Developer Habib. All
            rights reserved.
          </p>
        </div>
        <div className="flex space-x-8">
          <Link to="/about-us" className="hover:text-gray-300">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined className="text-2xl hover:text-gray-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined className="text-2xl hover:text-gray-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined className="text-2xl hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
