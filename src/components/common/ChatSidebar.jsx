import { getUserProfile } from "@/api/services/userService";
import CustomTooltip from "@/components/CustomTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, Home } from "lucide-react";
import React, { useEffect, useState } from "react";

const sidebarItems = [
  {
    name: "Trang Chủ",
    icon: Home,
    href: "/",
  },
  { name: "Diễn Đàn", icon: Globe, href: "/forum" },
];

const ChatSidebar = () => {
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
  return (
    <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg mr-6 py-6 w-16 h-[calc(100vh-3rem)] justify-between">
      <div className="flex flex-col gap-4 items-center">
        {/* Home icon - use Link if you have React Router */}
        {sidebarItems.map((item) => (
          <CustomTooltip key={item.name} content={item.name}>
            <Button
              variant="ghost"
              className="w-12 h-12 flex items-center justify-center rounded-full transition-colors text-purple-600 hover:bg-purple-100 cursor-pointer"
              onClick={() => (window.location.href = item.href)}
            >
              <item.icon className="w-6 h-6 text-gray-600" />
            </Button>
          </CustomTooltip>
        ))}
      </div>
      {/* You can add a user avatar or logo at the bottom */}
      <CustomTooltip
        content={
          userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : "User"
        }
        side="right"
        align="start"
      >
        <Avatar className="w-10 h-10">
          <AvatarImage src={userInfo?.avatarUrl} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </CustomTooltip>
    </div>
  );
};

export default ChatSidebar;
