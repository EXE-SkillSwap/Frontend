import instance from "@/services/axiosConfig";

export const addComment = async (postId, commentData) => {
  return instance.post(`comments/${postId}`, commentData);
};

export const getCommentsByPostId = async (postId) => {
  return instance.get(`comments/${postId}`);
};
