import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-custom-blue text-white py-10">
      <div className="md:max-w-7xl mx-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-2xl font-semibold">sportLine</h2>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Created by Developer Habib. All
              rights reserved.
            </p>
            <p className="text-sm">
              Your trusted platform for all sports bookings. Fast, reliable, and
              tailored to fit your game.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link to="/" className="hover:text-gray-300 text-sm">
              Home
            </Link>
            <Link to="/about-us" className="hover:text-gray-300 text-sm">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-gray-300 text-sm">
              Contact Us
            </Link>
            <Link to="/login" className="hover:text-gray-300 text-sm">
              Login
            </Link>
          </div>

          {/* Contact Info and Social Media */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <p className="text-sm">Email: support@sportline.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
            <p className="text-sm">
              Address: 123 Sport St, Suite 456, Cityville
            </p>
            <div className="flex space-x-4 mt-4">
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
      </div>
    </footer>
  );
};

export default Footer;
