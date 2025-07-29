import axios from "../axiosConfig";

// Lấy danh sách kỹ năng của user
export const getUserSkills = async () => {
  try {
    const response = await axios.get("/api/user-skills");
    return response;
  } catch (error) {
    throw error;
  }
};

// Thêm kỹ năng mới
export const addUserSkill = async (skillData) => {
  try {
    const response = await axios.post("/api/user-skills", skillData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Cập nhật kỹ năng
export const updateUserSkill = async (skillId, skillData) => {
  try {
    const response = await axios.put(`/api/user-skills/${skillId}`, skillData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Xóa kỹ năng
export const deleteUserSkill = async (skillId) => {
  try {
    const response = await axios.delete(`/api/user-skills/${skillId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết kỹ năng
export const getUserSkillById = async (skillId) => {
  try {
    const response = await axios.get(`/api/user-skills/${skillId}`);
    return response;
  } catch (error) {
    throw error;
  }
};