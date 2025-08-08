import instance from "@/services/axiosConfig";

export const createPosts = async (data) => {
  return instance.post("posts", data);
};

export const getAllPosts = async (page) => {
  return instance.get(`posts?page=${page}&size=10`);
};

export const getPostById = async (postId) => {
  return instance.get(`posts/${postId}`);
};
