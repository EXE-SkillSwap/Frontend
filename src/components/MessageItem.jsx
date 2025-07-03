import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const MessageItem = ({ message, currentUserId }) => {
  const isOwn = message.senderId == currentUserId;

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Check if content is media
  const isMediaMessage = message.mediaUrl !== null;
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex ${
          isOwn ? "flex-row-reverse" : "flex-row"
        } items-end gap-2 max-w-xs lg:max-w-md`}
      >
        {/* Avatar - only show for other users */}
        {!isOwn && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">
              {message.senderName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-col">
          {/* Sender name - only show for other users */}
          {!isOwn && (
            <div className="text-xs text-gray-500 mb-1 px-2">
              {message.senderName}
            </div>
          )}

          {/* Message bubble */}
          <div
            className={`px-4 py-2 rounded-2xl ${
              isOwn
                ? "bg-purple-600 text-white rounded-br-md"
                : "bg-gray-200 text-gray-900 rounded-bl-md"
            }`}
          >
            {/* Media content */}
            {isMediaMessage && (
              <div className="mb-2">
                {message.mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <img
                    src={message.mediaUrl || "/placeholder.svg"}
                    alt="Shared media"
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: "200px" }}
                  />
                ) : message.mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={message.mediaUrl}
                    controls
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: "200px" }}
                  />
                ) : (
                  <a
                    href={message.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline ${
                      isOwn ? "text-purple-200" : "text-purple-600"
                    }`}
                  >
                    View attachment
                  </a>
                )}
              </div>
            )}

            {/* Text content */}
            {message.content && (
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div
            className={`text-xs text-gray-500 mt-1 ${
              isOwn ? "text-right" : "text-left"
            } px-2`}
          >
            {formatTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
