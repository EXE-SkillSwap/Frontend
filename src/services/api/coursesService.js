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

export const getAttendedCourses = async (size, page) => {
  return instance.get(`courses/attended-courses?size=${size}&page=${page}`);
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

export const enrollInCourse = async (courseId) => {
  return instance.post(`course-attendance/enroll/${courseId}`);
};

export const getCourseAttendees = async (courseId, size, page) => {
  return instance.get(
    `course-attendance/attendees/${courseId}?size=${size}&page=${page}`
  );
};

export const getBestCourses = async (size, page) => {
  return instance.get(`courses/best-courses?size=${size}&page=${page}`);
};
