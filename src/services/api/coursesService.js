import instance from "@/services/axiosConfig";

export const addCourses = async (data) => {
  return instance.post("courses", data);
};

export const getCoursesByCurrentUser = async (size, page) => {
  return instance.get(`courses/my-courses?size=${size}&page=${page}`);
};
