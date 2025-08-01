import instance from "@/services/axiosConfig";

export const getNotifications = async () => {
  return instance.get("/notifications");
};

export const markNotificationAsRead = async (notificationId) => {
  return instance.put(`/notifications/make-read/${notificationId}`);
};

export const markAllNotificationsAsRead = async () => {
  return instance.put("/notifications/make-all-read");
};
