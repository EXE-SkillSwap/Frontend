import instance from "@/services/axiosConfig";
import axios from "axios";

export const register = async (data) => {
  return instance.post("users", data);
};

export const getSkills = async () => {
  return instance.get("skills");
};
export const getUserProfile = async () => {
  return instance.get("users/p");
};

export const updateUserSkills = async (tags) => {
  const formData = new FormData();
  formData.append("tags", tags);
  return instance.post("users/skill-tags", formData);
};

export const getAllProvinces = async () => {
  return axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
};

export const updateProfile = async (data) => {
  return instance.put("users/update-profile", data);
};

export const getUserToFindFriends = async (page, size = 10) => {
  return instance.get(`users/find-friends?page=${page}&size=${size}`);
};

export const uploadProfileImage = async (formData) => {
  return instance.post("users/upload-profile-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProfileImageByUserId = async (userId) => {
  return instance.get(`users/profile-images/${userId}`);
};
