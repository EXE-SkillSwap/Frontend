import instance from "@/services/axiosConfig";

export const likePost = async (postId) => {
  return instance.post(`likes/${postId}`);
};
