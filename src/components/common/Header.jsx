import logo from "@/assets/newLogo.png";
import NotificationSheet from "@/components/common/NotificationSheet";
import UserPopover from "@/components/common/UserPopover";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { isAuthenticated } from "@/utils/auth.utils";
import { Globe, Menu, MessageCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Bạn Bè", href: "/friends", icon: Users },
  { name: "Trò Chuyện", href: "/chats", icon: MessageCircle },
  { name: "Diễn Đàn", href: "/posts", icon: Globe },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

  const logOut = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      {/* Futuristic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation("/")}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                  <img src={logo} alt="Logo" className="w-6 h-6 rounded-md" />
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              SkillsSwap
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated() &&
              navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 group ${
                      isActive
                        ? "text-white shadow-lg"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full" />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gray-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    <div className="relative flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {isActive && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-30" />
                    )}
                  </button>
                );
              })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                {/* Notifications */}
                <NotificationSheet />

                {/* User Menu */}
                <UserPopover />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="rounded-full px-6 py-2 font-medium hover:bg-gray-100/50 transition-all duration-300"
                  onClick={() => handleNavigation("/login")}
                >
                  Đăng Nhập
                </Button>
                <Button
                  className="rounded-full px-6 py-2 font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                  onClick={() => handleNavigation("/register")}
                >
                  Đăng Ký
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full hover:bg-gray-100/50 transition-all duration-300"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-white/95 backdrop-blur-xl border-l border-white/20"
                >
                  <div className="flex flex-col space-y-6 mt-8">
                    {/* Mobile Logo */}
                    <div className="flex items-center space-x-3 pb-6 border-b border-gray-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5">
                        <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                          <img
                            src={logo}
                            alt="Logo"
                            className="w-6 h-6 rounded-md"
                          />
                        </div>
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                        SkillsSwap
                      </span>
                    </div>

                    {/* Mobile Navigation */}
                    {isAuthenticated() && (
                      <div className="space-y-2">
                        {navigation.map((item) => {
                          const Icon = item.icon;
                          const isActive = currentPath === item.href;

                          return (
                            <button
                              key={item.name}
                              onClick={() => handleNavigation(item.href)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                isActive
                                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg"
                                  : "text-gray-700 hover:bg-gray-100/50"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              <span>{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Mobile Auth Buttons */}
                    {!isAuthenticated() && (
                      <div className="space-y-3 pt-6">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl py-3 font-medium border-gray-200 hover:bg-gray-50"
                          onClick={() => handleNavigation("/login")}
                        >
                          Đăng Nhập
                        </Button>
                        <Button
                          className="w-full rounded-xl py-3 font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                          onClick={() => handleNavigation("/register")}
                        >
                          Đăng Ký
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
  );
};

export default Header;
