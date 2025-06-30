import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Home,
  Users,
  Grid3X3,
  Bell,
  Settings,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Plus,
  Smile,
  Paperclip,
  Mic,
  User,
} from "lucide-react";

export default function Index() {
  const [messageText, setMessageText] = useState("");

  const sidebarItems = [
    { icon: Home, active: true },
    { icon: Users, active: false },
    { icon: Grid3X3, active: false },
    { icon: Bell, active: false },
    { icon: Settings, active: false },
  ];

  const pinnedChats = [
    {
      name: "Kevin",
      message: "Louda will send the initial list of offers...",
      time: "1 days",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
    {
      name: "Beth",
      message: "That would be nice.",
      time: "2 days",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
    {
      name: "Kevin",
      message: "Louda will send the initial list of offers...",
      time: "2 days",
      avatar: "/placeholder.svg",
      hasCheck: false,
      isOnline: true,
      hasNotification: true,
    },
    {
      name: "Kayo Miwa",
      message: "I received with the client on Tuesdays...",
      time: "3 days",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
    {
      name: "Adam",
      message: "Louda will send the initial list of offers...",
      time: "3 days",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
  ];

  const recentChats = [
    {
      name: "Kevin",
      message: "Louda will send the initial list of offers...",
      time: "1 days",
      avatar: "/placeholder.svg",
      hasCheck: false,
      isOnline: true,
      hasNotification: true,
    },
    {
      name: "Beth",
      message: "Thanks, that would be nice.",
      time: "2 days",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
    {
      name: "Kevin",
      message: "Louda will send the initial list of offers...",
      time: "2 days",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
    {
      name: "Kayo Miwa",
      message: "I received with the client on Tuesdays...",
      time: "62",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
    {
      name: "Adam",
      message: "Louda will send the initial list of offers...",
      time: "",
      avatar: "/placeholder.svg",
      hasCheck: true,
      isOnline: false,
    },
  ];

  const messages = [
    {
      id: 1,
      text: "Hello",
      time: "10 days, 2:25pm",
      isOwn: false,
    },
    {
      id: 2,
      text: "How are you",
      time: "",
      isOwn: false,
    },
    {
      id: 3,
      text: "I'm doing well.",
      time: "",
      isOwn: true,
    },
    {
      id: 4,
      text: "I will push Albert to give us a few more days. That shouldn't be a problem.",
      time: "",
      isOwn: false,
    },
    {
      id: 5,
      text: "Can we meet tomorrow?",
      time: "",
      isOwn: false,
    },
    {
      id: 6,
      text: "Hello",
      time: "",
      isOwn: true,
    },
    {
      id: 7,
      text: "I'm fine and how about you?",
      time: "",
      isOwn: true,
    },
    {
      id: 8,
      text: "That would be nice.",
      time: "",
      isOwn: true,
    },
    {
      id: 9,
      text: "10 days, 2:25pm",
      time: "10 days, 2:25pm",
      isOwn: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 p-6 flex">
      {/* Vertical Toolbar */}
      <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg mr-6 py-6 w-16 h-[calc(100vh-3rem)] justify-between">
        <div className="flex flex-col gap-4 items-center">
          {/* Home icon - use Link if you have React Router */}
          <Button
            variant="ghost"
            size="icon"
            className="text-purple-600 hover:bg-purple-100"
            onClick={() => (window.location.href = "/")}
            aria-label="Home"
          >
            <Home className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100" aria-label="Profile">
            <User className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100" aria-label="Settings">
            <Settings className="w-6 h-6" />
          </Button>
        </div>
        {/* You can add a user avatar or logo at the bottom */}
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      {/* Main Chat Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden h-[calc(100vh-3rem)] flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800">Logo</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 w-80 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100%-80px)]">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Navigation */}
            <div className="flex items-center justify-center py-4 gap-1">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  size="icon"
                  className={
                    item.active
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "text-gray-600"
                  }
                >
                  <item.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {/* Chat Header */}
              <div className="px-4 py-2 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Chat</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Pinned Section */}
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Pinned
                </h3>
                <div className="space-y-1">
                  {pinnedChats.map((chat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>{chat.name[0]}</AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 truncate">
                            {chat.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              {chat.time}
                            </span>
                            {chat.hasCheck && (
                              <div className="text-blue-500">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.message}
                        </p>
                      </div>
                      {chat.hasNotification && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Section */}
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Recent
                </h3>
                <div className="space-y-1">
                  {recentChats.map((chat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>{chat.name[0]}</AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 truncate">
                            {chat.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              {chat.time}
                            </span>
                            {chat.hasCheck && (
                              <div className="text-blue-500">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.message}
                        </p>
                      </div>
                      {chat.hasNotification && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">Beth</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Info className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-xs lg:max-w-md">
                    {message.time && (
                      <div className="text-center text-xs text-gray-500 mb-2">
                        {message.time}
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? "bg-purple-600 text-white rounded-br-md"
                          : "bg-gray-200 text-gray-900 rounded-bl-md"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white px-6 py-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Plus className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a new message"
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 h-8 w-8"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 h-8 w-8"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 h-8 w-8"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
