import newLogo from "@/assets/newLogo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logOut } from "@/utils/auth.utils";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  LogOutIcon,
  Users,
  CreditCard,
  FileCheck,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navigationItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: Users,
    label: "Quản lý người dùng",
    href: "/admin/participants",
  },
  {
    icon: CreditCard,
    label: "Gói thành viên",
    href: "/admin/memberships",
    children: [
      { label: "Danh sách gói", href: "/admin/memberships" },
      { label: "Lượt đăng ký", href: "/admin/subscriptions" },
    ],
  },
  {
    icon: BookOpen,
    label: "Quản lý khóa học",
    href: "/admin/courses",
    children: [{ label: "Kiểm duyệt", href: "/admin/courses" }],
  },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => navigate("/admin/dashboard")}
        >
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <img src={newLogo} alt="Company Logo" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
              SkillsSwap
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <Button
          variant="outline"
          className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-white border-gray-200"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
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
    <div className="space-y-1">
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
          isActive || isChildActive
            ? "bg-gray-900 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <div className="flex items-center">
          <Icon
            className={cn(
              "mr-3 h-4 w-4 transition-colors",
              isActive || isChildActive
                ? "text-white"
                : "text-gray-500 group-hover:text-gray-700"
            )}
          />
          {item.label}
        </div>
        {hasChildren && (
          <div
            className={cn(
              "transition-transform duration-200",
              isOpen ? "rotate-0" : ""
            )}
          >
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
        <div className="ml-6 space-y-1 border-l border-gray-200 pl-4">
          {item.children.map((child) => (
            <button
              key={child.href}
              onClick={() => handleChildClick(child.href)}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === child.href
                  ? "bg-gray-100 text-gray-900 border-l-2 border-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="w-2 h-2 rounded-full bg-current opacity-50 mr-3"></div>
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
