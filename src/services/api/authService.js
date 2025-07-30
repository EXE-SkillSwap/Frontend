import instance from "@/services/axiosConfig";

export const login = async (data) => {
  return instance.post("auth", data);
};
