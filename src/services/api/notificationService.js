import instance from "@/services/axiosConfig";

export const getNotifications = async () => {
  return instance.get("/notifications");
};
