import { getUserProfile } from "@/api/services/userService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/utils/auth.utils";
import { Crown, LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPopover = () => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserProfile();
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const handleLogOut = () => {
    logOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-10 h-10 rounded-full p-0 hover:scale-105 transition-transform duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Avatar className="cursor-pointer" onClick={() => setOpen(!open)}>
                <AvatarImage src={userInfo?.avatarUrl} />
                <AvatarFallback>
                  {userInfo?.firstName?.charAt(0)}
                  {userInfo?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      {open && (
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl"
        >
          <DropdownMenuItem
            className="hover:bg-gray-100/50"
            onClick={() => nav("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Hồ Sơ</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-gray-100/50"
            onClick={() => nav("/membership")}
          >
            <Crown className="mr-2 h-4 w-4" />
            <span>Thành viên</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-100/50">
            <Settings className="mr-2 h-4 w-4" />
            <span>Cài Đặt</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:bg-red-50 text-red-600"
            onClick={handleLogOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng Xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserPopover;
