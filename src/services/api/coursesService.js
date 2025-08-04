import instance from "@/services/axiosConfig";

export const addCourses = async (data) => {
  return instance.post("courses", data);
};

export const getCoursesByCurrentUser = async (size, page) => {
  return instance.get(`courses/my-courses?size=${size}&page=${page}`);
};

export const getAllCourses = async (
  size,
  page,
  searchString,
  status,
  sortBy
) => {
  return instance.get(
    `courses/all?page=${page}&size=${size}&status=${status}&searchString=${searchString}&sortBy=${sortBy}`
  );
};

export const getCourseById = async (courseId) => {
  return instance.get(`courses/${courseId}`);
};

export const approveCourse = async (courseId) => {
  return instance.put(`courses/approve/${courseId}`);
};

export const rejectCourse = async (body) => {
  return instance.put(`courses/reject`, body);
};
