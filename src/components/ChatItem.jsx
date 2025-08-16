import React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatItem = ({
  chat,
  onClick,
  hasNotification = false,
  hasCheck = false,
}) => {
  const isGroupChat = chat.participants.length > 1;

  const getChatName = () => {
    if (isGroupChat) {
      return chat.title;
    }
    const participant = chat.participants[0];
    return `${participant.user.firstName} ${participant.user.lastName}`.trim();
  };

  const renderSingleAvatar = (participant) => (
    <div className="relative">
      <Avatar className="w-10 h-10">
        <AvatarImage src={participant.user.avatarUrl || "/placeholder.svg"} />
        <AvatarFallback>
          {participant.user.firstName[0]}
          {participant.user.lastName[0]}
        </AvatarFallback>
      </Avatar>
    </div>
  );

  const renderGroupAvatars = (participants) => {
    const displayParticipants = participants.slice(0, 3); // Show max 3 avatars
    const remainingCount = participants.length - 3;

    return (
      <div className="relative flex">
        {displayParticipants.map((participant, index) => (
          <div
            key={participant.id}
            className={`relative ${index > 0 ? "-ml-2" : ""}`}
            style={{ zIndex: displayParticipants.length - index }}
          >
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage
                src={participant.user.avatarUrl || "/placeholder.svg"}
              />
              <AvatarFallback className="text-xs">
                {participant.user.firstName[0]}
                {participant.user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className="relative -ml-2 flex items-center justify-center w-8 h-8 bg-gray-300 border-2 border-white rounded-full"
            style={{ zIndex: 0 }}
          >
            <span className="text-xs font-medium text-gray-600">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
      onClick={() => onClick(chat.id)}
    >
      {/* Avatar Section */}
      {isGroupChat
        ? renderGroupAvatars(chat.participants)
        : renderSingleAvatar(chat.participants[0])}

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 truncate">
            {getChatName()}
          </h4>
          <div className="flex items-center gap-1">
            {hasCheck && (
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
      </div>

      {/* Notification Badge */}
      {hasNotification && (
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

export default ChatItem;
