import instance from "@/services/axiosConfig";

export const getStatistics = async () => {
  return instance.get("/admin/statistics");
};

export const getRevenue = async () => {
  return instance.get("/admin/revenue");
};
