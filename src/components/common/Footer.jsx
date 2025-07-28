import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

import logo from "@/assets/newLogo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-indigo-500 inline-block">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-500 transition duration-300"
                >
                  Trang Chủ
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-indigo-500 transition duration-300"
                >
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-indigo-500 transition duration-300"
                >
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-indigo-500 inline-block">
              Thông Tin Liên Hệ
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: admin@skillsswap.io.vn</p>
              <p>Liên hệ: +84 077712345</p>
              <p>Địa chỉ: 123 Đường Giáo Dục, Thành Phố Học Tập</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-indigo-500 inline-block">
              Theo Dõi Chúng Tôi
            </h3>
            <div className="flex space-x-4 mt-4">
              <a
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=100090153279761",
                    "_blank"
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-indigo-500 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              >
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-24 h-24">
              <img src={logo} alt="Logo" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SkillSwap. Tất cả các quyền được
            bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
