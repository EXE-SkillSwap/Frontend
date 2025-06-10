import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/newLogo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Copyright Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-white flex items-center justify-center">
                <img alt="Logo" src={logo} />
              </div>

              <span className="font-medium text-lg">SkillSwap</span>
            </div>

            <div className="text-sm text-gray-400">
              <p>Copyright © SkillSwap</p>
              <p>All rights reserved</p>
            </div>

            <div className="flex space-x-3">
              <a
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=100090153279761",
                    "_blank"
                  )
                }
                className="h-8 w-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-gray-400">
              SẢN PHẨM
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Đánh giá
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Giáo dục
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-gray-400">
              CÔNG TY
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Đội ngũ
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-gray-400">
              HỖ TRỢ
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Hướng dẫn
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-200 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
