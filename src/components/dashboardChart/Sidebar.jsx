import newLogo from "@/assets/newLogo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logOut } from "@/utils/auth.utils";
import {
  Calendar,
  DollarSign,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Receipt,
  Settings,
  Upload,
  UserCheck,
  Users,
} from "lucide-react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Participants", href: "/admin/participants" },
  { icon: Upload, label: "Upload Document", href: "/admin/upload-document" },
  { icon: Inbox, label: "Inbox", href: "/inbox" },
  { icon: FileText, label: "Document Lists", href: "/documents" },
];

const pageItems = [
  { icon: DollarSign, label: "Pricing", href: "/pricing" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: UserCheck, label: "Users", href: "/users" },
  { icon: MessageSquare, label: "Contact", href: "/contact" },
  { icon: Receipt, label: "Invoice", href: "/invoice" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: LogOut, label: "Logout", href: "/logout" },
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
            {/* <span className="text-white font-bold text-sm">S</span> */}
            <img src={newLogo} alt="Company Logo" />
          </div>
          <span className="text-xl font-semibold">
            <span className="text-purple-600 font-bold">Skill</span>
            <span className="text-gray-900 font-bold">Swap</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        {/* Pages Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            PAGES
          </h3>
          <div className="space-y-1">
            {pageItems.map((item) => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          <Button
            className="w-full cursor-pointer"
            variant="destructive"
            onClick={handleLogut}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ item }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const Icon = item.icon;

  const handleClick = () => {
    navigate(item.href);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left cursor-pointer",
        isActive
          ? "bg-purple-600 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {item.label}
    </button>
  );
}

SidebarItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
};
