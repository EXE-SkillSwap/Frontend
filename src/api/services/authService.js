import instance from "@/api/axiosConfig";

export const login = async (data) => {
  return instance.post("auth", data);
};
