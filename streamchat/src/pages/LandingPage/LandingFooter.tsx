import { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const LandingFooter = () => {
  const [isDark] = useState<boolean>(true);
  return (
    <footer
      className={`${
        isDark ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      } py-8 transition-color duration-500`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StreamChat</h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              } transition-color duration-500`}
            >
              Your ultimate streaming companion for movies, TV shows, and web
              series.
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                className={`${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="#"
                className={`${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className={`${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`mt-8 pt-8 border-t ${
            isDark ? "border-gray-800" : "border-gray-200"
          } text-center text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          } transition-all duration-500`}
        >
          &copy; {new Date().getFullYear()} StreamChat. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
