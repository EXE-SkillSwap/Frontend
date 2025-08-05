import instance from "@/services/axiosConfig";

export const sendFeedback = async (courseId, feedbackData) => {
  return instance.post(`/feedbacks/send/${courseId}`, feedbackData);
};

export const getFeedbacks = async (courseId) => {
  return instance.get(`/feedbacks/${courseId}`);
};
