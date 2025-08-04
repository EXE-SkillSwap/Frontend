import newLogo from "@/assets/newLogo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logOut } from "@/utils/auth.utils";
import {
  GiftIcon,
  LayoutDashboard,
  LogOutIcon,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const navigationItems = [
  { icon: LayoutDashboard, label: "Thống kê", href: "/admin/dashboard" },
  { icon: Users, label: "Quản lí Người dùng", href: "/admin/participants" },
  {
    icon: GiftIcon,
    label: "Quản lí gói thành viên",
    href: "/admin/memberships",
  },
  {
    icon: LayoutDashboard,
    label: "Quản lí Khóa học",
    href: "/admin/courses",
    // Example of adding dropdown items
    children: [{ label: "Kiểm duyệt", href: "/admin/courses" }],
  },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogut = () => {
    logOut();
  };
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <img src={newLogo} alt="Company Logo" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
            SkillsSwap
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          <Button className="w-full cursor-pointer" onClick={handleLogut}>
            Đăng xuất <LogOutIcon className="inline-block ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ item }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = location.pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive =
    hasChildren &&
    item.children.some((child) => location.pathname === child.href);
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      navigate(item.href);
    }
  };

  const handleChildClick = (childHref) => {
    navigate(childHref);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-sm text-sm font-medium transition-colors w-full text-left cursor-pointer",
          isActive || isChildActive
            ? "bg-gray-600 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <div className="flex items-center">
          <Icon className="mr-3 h-5 w-5" />
          {item.label}
        </div>
        {hasChildren && (
          <div className="ml-auto">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </button>

      {/* Dropdown Items */}
      {hasChildren && isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children.map((child) => (
            <button
              key={child.href}
              onClick={() => handleChildClick(child.href)}
              className={cn(
                "flex items-center px-3 py-2 rounded-sm text-sm font-medium transition-colors w-full text-left cursor-pointer",
                location.pathname === child.href
                  ? "bg-gray-500 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
