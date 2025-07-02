import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const GroupChatHeader = ({ conversation }) => {
  if (!conversation) return null;

  const isGroupChat =
    conversation.participants && conversation.participants.length > 1;
  const maxAvatarsToShow = 3;
  const participantsToShow =
    conversation.participants?.slice(0, maxAvatarsToShow) || [];
  const remainingCount =
    (conversation.participants?.length || 0) - maxAvatarsToShow;

  // Get group name or generate from participants
  const getGroupName = () => {
    if (conversation.title) {
      return conversation.title;
    }
    // Fallback: create name from participants
    const names =
      conversation.participants
        ?.map((p) => p.user.firstName.trim())
        .slice(0, 2) || [];
    return names.length > 1
      ? `${names.join(", ")} and others`
      : names[0] || "Group Chat";
  };

  // Get participant count text
  const getParticipantCount = () => {
    const count = conversation.participants?.length + 1 || 0;
    return `${count} thành viên`;
  };

  if (isGroupChat) {
    return (
      <div className="flex items-center gap-3 p-4 bg-white">
        {/* Group Avatars */}
        <div className="relative flex items-center">
          {participantsToShow.map((participant, index) => (
            <div
              key={participant.id}
              className={`relative ${index > 0 ? "-ml-3" : ""}`}
              style={{ zIndex: maxAvatarsToShow - index }}
            >
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage
                  src={participant.user.avatarUrl || "/placeholder.svg"}
                  alt={`${participant.user.firstName} ${participant.user.lastName}`}
                />
                <AvatarFallback className="text-sm">
                  {participant.user.firstName.charAt(0).toUpperCase()}
                  {participant.user.lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}

          {/* Show remaining count if there are more participants */}
          {remainingCount > 0 && (
            <div
              className="relative -ml-3 flex items-center justify-center w-10 h-10 bg-gray-300 border-2 border-white rounded-full"
              style={{ zIndex: 0 }}
            >
              <span className="text-xs font-medium text-gray-600">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>

        {/* Group Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {getGroupName()}
          </h3>
          <p className="text-sm text-gray-500">{getParticipantCount()}</p>
        </div>
      </div>
    );
  }

  // Single participant chat (fallback)
  const participant = conversation.participants?.[0];
  if (!participant) return null;

  return (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={participant.user.avatarUrl || "/placeholder.svg"}
          alt={`${participant.user.firstName} ${participant.user.lastName}`}
        />
        <AvatarFallback>
          {participant.user.firstName.charAt(0).toUpperCase()}
          {participant.user.lastName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">
          {`${participant.user.firstName} ${participant.user.lastName}`.trim()}
        </h3>
      </div>
    </div>
  );
};

export default GroupChatHeader;
