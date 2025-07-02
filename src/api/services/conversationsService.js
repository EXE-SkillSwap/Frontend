import instance from "@/api/axiosConfig";

export const getConversations = async () => {
  return instance.get(`chat/current/conversations`);
};

export const getConversationMessages = async (conversationId) => {
  return instance.get(`chat/messages/conversation/${conversationId}`);
};
