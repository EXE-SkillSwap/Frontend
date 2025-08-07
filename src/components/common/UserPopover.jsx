import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearUser, fetchUserProfile } from "@/redux/slices/profileSlice";
import { logOut } from "@/utils/auth.utils";
import { BookOpen, Crown, LogOut, ShapesIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserPopover = () => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleLogOut = () => {
    dispatch(clearUser());
    logOut();
  };

  const popoverItems = [
    {
      label: "Hồ Sơ",
      icon: <User className="mr-2 h-4 w-4" />,
      action: () => nav("/profile"),
    },
    {
      label: "Thành Viên",
      icon: <Crown className="mr-2 h-4 w-4" />,
      action: () => nav("/membership"),
    },
    {
      label: "Khóa Học Của Tôi",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      action: () => nav("/my-courses"),
    },
    {
      label: "Khóa Học Đã Tham Gia",
      icon: <ShapesIcon className="mr-2 h-4 w-4" />,
      action: () => nav("/attended-courses"),
    },
    {
      label: "Đăng Xuất",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      action: handleLogOut,
      className: "text-red-600 hover:bg-red-50",
    },
  ];
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
          {popoverItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={`hover:bg-gray-100/50 ${item.className || ""}`}
              onClick={item.action}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserPopover;
