import { getUserProfile } from "@/api/services/userService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { logOut } from "@/utils/auth.utils";
import { CrownIcon, Info, LogOutIcon } from "lucide-react";
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer" onClick={() => setOpen(!open)}>
          <AvatarImage src={userInfo?.avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      {open && (
        <PopoverContent className="w-60 bg-white p-4 shadow-lg">
          <div className="grid gap-4">
            <Button
              variant={"ghost"}
              className={"cursor-pointer"}
              onClick={() => nav("/profile")}
            >
              <Info className="mr-2 h-4 w-4" />
              Thông tin cá nhân
            </Button>
            <Button
              variant={"ghost"}
              className={"cursor-pointer"}
              onClick={() => nav("/membership")}
            >
              <CrownIcon className="mr-2 h-4 w-4 text-amber-300" />
              Thành viên
            </Button>
            <Separator />
            <Button
              onClick={handleLogOut}
              variant={"destructive"}
              className={"cursor-pointer"}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Đăng Xuất
            </Button>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default UserPopover;
