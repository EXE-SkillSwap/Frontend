import logo from "@/assets/newLogo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/services/api/notificationService";
import { playNotificationSound } from "@/utils/audito";
import { formatDateAgo } from "@/utils/format";
import { Client } from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
import { Bell, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationSheet = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const nav = useNavigate();
  const currentUserId = jwtDecode(localStorage.getItem("token")).sub;

  const markAsRead = async (notification) => {
    await markNotificationAsRead(notification.id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification);
    }
    nav(notification.url);
    setOpen(false);
  };

  const markAllAsRead = async () => {
    await markAllNotificationsAsRead();
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const connectSocket = (callback) => {
      const client = new Client({
        brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
        connectHeaders: {},
        reconnectDelay: 5000,
        onConnect: () => {
          client.subscribe(
            `/topic/notifications/${currentUserId}`,
            (response) => {
              callback(response.body);
            }
          );
        },
        onDisconnect: () => {
          console.log("Disconnected");
        },
      });
      client.activate();
      return client;
    };

    const handleData = (data) => {
      setNotifications((prev) => {
        const newNotification = JSON.parse(data);
        if (prev.some((n) => n.id === newNotification.id)) {
          return prev.map((n) =>
            n.id === newNotification.id ? newNotification : n
          );
        }
        return [newNotification, ...prev];
      });
      playNotificationSound();
    };

    const client = connectSocket(handleData);
    fetchNotifications();

    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, []);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-full hover:bg-gray-100/50 transition-all duration-300 group"
          >
            <Bell className="w-7 h-7 text-purple-950 group-hover:text-gray-900 transition-colors" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white text-xs">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </div>
      </SheetTrigger>
      {open && (
        <SheetContent className="w-full sm:w-[400px] p-0">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">
                Thông Báo
              </SheetTitle>
              <SheetDescription />
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Đánh dấu tất cả đã đọc
                </Button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500">
                Bạn có {unreadCount} thông báo chưa đọc
              </p>
            )}
          </SheetHeader>

          <Separator />

          <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
            <div className="p-4 space-y-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có thông báo
                  </h3>
                  <p className="text-sm text-gray-500">
                    Bạn sẽ nhận được thông báo khi có hoạt động mới
                  </p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className={`group relative p-4 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer ${
                        !notification.read
                          ? "bg-blue-50/30 border-l-4 border-l-indigo-400"
                          : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Avatar or Icon */}
                        <div className="flex-shrink-0">
                          <img
                            src={logo}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p
                                className={`text-sm font-medium text-gray-900 ${
                                  !notification.read ? "font-semibold" : ""
                                }`}
                              >
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {notification.content}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {formatDateAgo(notification.createdAt)}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="w-8 h-8 p-0 hover:bg-green-100"
                                  title="Đánh dấu đã đọc"
                                >
                                  <Check className="w-4 h-4 text-green-600" />
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Read indicator */}
                          {!notification.read && (
                            <div className="absolute top-4 right-4">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default NotificationSheet;
