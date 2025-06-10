import instance from "@/api/axiosConfig";

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
