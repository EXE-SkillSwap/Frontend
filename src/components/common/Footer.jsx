import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart, Sparkles, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/newLogo.png";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Ultra-modern footer with glass morphism */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        {/* Dynamic background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-400/30 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse delay-3000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-purple-500/25">
                  <div className="w-full h-full rounded-[14px] bg-white/95 backdrop-blur-sm flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-10 h-10 rounded-lg"
                    />
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl blur-xl opacity-30" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  SkillsSwap
                </h2>
                <p className="text-gray-300 text-sm font-medium">
                  Kết nối • Học hỏi • Phát triển
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Nơi kết nối những người đam mê học hỏi và chia sẻ kiến thức. Cùng
              nhau xây dựng tương lai tươi sáng qua việc trao đổi kỹ năng.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Quick Links */}
            <div className="group">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Liên Kết Nhanh
                </span>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Trang Chủ", path: "/" },
                  { name: "Về Chúng Tôi", path: "/about" },
                  { name: "Diễn Đàn", path: "/forum" },
                  { name: "Liên Hệ", path: "/contact" },
                  { name: "Điều Khoản", path: "/terms" },
                  { name: "Bảo Mật", path: "/privacy" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group/item"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></span>
                      <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="group">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Thông Tin Liên Hệ
                </span>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group/contact">
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/contact:bg-blue-500/20 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>admin@skillsswap.io.vn</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group/contact">
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/contact:bg-green-500/20 transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+84 077712345</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group/contact">
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/contact:bg-purple-500/20 transition-colors duration-300 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>123 Đường Giáo Dục, Thành Phố Học Tập</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="group">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Kết Nối Với Chúng Tôi
                </span>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    icon: FaFacebook,
                    color: "from-blue-600 to-blue-700",
                    url: "https://www.facebook.com/profile.php?id=100090153279761",
                  },
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      onClick={() => window.open(social.url, "_blank")}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl group/social`}
                    >
                      <IconComponent className="text-lg group-hover/social:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>
                  &copy; {new Date().getFullYear()} SkillsSwap. Được phát triển
                  với
                </span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>tại Việt Nam</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors duration-300"
                >
                  Điều khoản
                </Link>
                <span>•</span>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors duration-300"
                >
                  Bảo mật
                </Link>
                <span>•</span>
                <Link
                  to="/cookies"
                  className="hover:text-white transition-colors duration-300"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom styles for enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Footer;
