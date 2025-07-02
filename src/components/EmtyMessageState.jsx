import { MessageCircleOff } from "lucide-react";
import React from "react";

const EmtyMessageState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MessageCircleOff className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Không có tin nhắn
      </h3>
      <p className="text-gray-500 text-center max-w-sm">
        Bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn đầu tiên hoặc chia sẻ một
        tệp.
      </p>
    </div>
  );
};

export default EmtyMessageState;
