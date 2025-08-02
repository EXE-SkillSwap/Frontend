import logo from "@/assets/newLogo.png";
import NotificationSheet from "@/components/common/NotificationSheet";
import UserPopover from "@/components/common/UserPopover";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { isAuthenticated } from "@/utils/auth.utils";
import { Globe, Menu, MessageCircle, Users, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Bạn Bè", href: "/friends", icon: Users },
  { name: "Trò Chuyện", href: "/chats", icon: MessageCircle },
  { name: "Diễn Đàn", href: "/forum", icon: Globe },
];

const Header = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href) => {
    setCurrentPath(href);
    nav(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Ultra-modern header with glass morphism and dynamic effects */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-purple-500/10"
            : "bg-white/5 backdrop-blur-xl"
        }`}
      >
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-500/8 to-pink-500/10 pointer-events-none" />

        {/* Animated border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between">
            {/* Enhanced Logo Section */}
            <div
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => handleNavigation("/")}
            >
              <div className="relative">
                {/* Main logo container with enhanced gradients */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-0.5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-lg shadow-purple-500/25">
                  <div className="w-full h-full rounded-[14px] bg-white/95 backdrop-blur-sm flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-7 h-7 rounded-lg" />
                  </div>
                </div>

                {/* Enhanced glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500" />

                {/* Sparkle effect */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
                  SkillsSwap
                </h1>
                <p className="text-xs text-gray-200 font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  Trao đổi kỹ năng • Kết nối tương lai
                </p>
              </div>
            </div>

            {/* Ultra-modern Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-lg rounded-2xl p-1 border border-white/20 shadow-lg shadow-purple-500/5">
                {isAuthenticated() &&
                  navigation.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href;

                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item.href)}
                        className={`relative px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-500 group overflow-hidden ${
                          isActive
                            ? "text-white shadow-lg shadow-purple-500/25"
                            : "text-gray-200 hover:text-gray-900"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Active background with animated gradient */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl animate-gradient-x" />
                        )}

                        {/* Hover effect */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/80 to-gray-200/80 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        )}

                        {/* Content */}
                        <div className="relative flex items-center space-x-2 z-10">
                          <Icon
                            className={`w-4 h-4 ${
                              isActive
                                ? "animate-pulse"
                                : "group-hover:scale-110"
                            } transition-transform duration-300`}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>

                        {/* Enhanced glow for active item */}
                        {isActive && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl blur-lg opacity-30 animate-pulse" />
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Enhanced Right Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated() ? (
                <div className="flex items-center space-x-3">
                  {/* Enhanced Notifications */}
                  <div className="relative">
                    <NotificationSheet />
                  </div>

                  {/* Enhanced User Menu */}
                  <div className="relative">
                    <UserPopover />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  {/* Ultra-modern auth buttons */}
                  <Button
                    variant="ghost"
                    className="relative overflow-hidden rounded-2xl px-6 py-2.5 font-semibold text-gray-700 hover:text-gray-900 bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-purple-500/10"
                    onClick={() => handleNavigation("/login")}
                  >
                    <span className="relative z-10">Đăng Nhập</span>
                  </Button>

                  <Button
                    className="relative overflow-hidden rounded-2xl px-6 py-2.5 font-semibold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 border-0"
                    onClick={() => handleNavigation("/register")}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Đăng Ký</span>
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </div>
              )}

              {/* Enhanced Mobile Menu */}
              <div className="lg:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-11 h-11 rounded-2xl hover:bg-white/20 backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <Menu className="w-5 h-5 text-gray-700" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-80 bg-white/5 backdrop-blur-2xl border-l border-white/10 shadow-2xl"
                  >
                    <div className="flex flex-col space-y-8 mt-8">
                      {/* Enhanced Mobile Logo */}
                      <div className="flex items-center space-x-4 pb-8 border-b border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-0.5 shadow-lg">
                          <div className="w-full h-full rounded-[14px] bg-white/95 flex items-center justify-center">
                            <img
                              src={logo}
                              alt="Logo"
                              className="w-7 h-7 rounded-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                            SkillsSwap
                          </h2>
                          <p className="text-xs text-gray-300 font-medium">
                            Trao đổi kỹ năng
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Mobile Navigation */}
                      {isAuthenticated() && (
                        <div className="space-y-3">
                          {navigation.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = currentPath === item.href;

                            return (
                              <button
                                key={item.name}
                                onClick={() => handleNavigation(item.href)}
                                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                                  isActive
                                    ? "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                                    : "text-white hover:bg-white/10 backdrop-blur-lg"
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <Icon
                                  className={`w-5 h-5 ${
                                    isActive ? "animate-pulse" : ""
                                  }`}
                                />
                                <span>{item.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Enhanced Mobile Auth Buttons */}
                      {!isAuthenticated() && (
                        <div className="space-y-4 pt-8">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Bắt đầu
                          </h3>
                          <Button
                            variant="outline"
                            className="w-full rounded-2xl py-4 font-semibold border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300"
                            onClick={() => handleNavigation("/login")}
                          >
                            Đăng Nhập
                          </Button>
                          <Button
                            className="w-full rounded-2xl py-4 font-semibold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 transition-all duration-300"
                            onClick={() => handleNavigation("/register")}
                          >
                            <span className="flex items-center space-x-2">
                              <span>Đăng Ký Ngay</span>
                              <Sparkles className="w-4 h-4 animate-pulse" />
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
