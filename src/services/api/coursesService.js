import instance from "@/services/axiosConfig";

export const addCourses = async (data) => {
  return instance.post("courses", data);
};
