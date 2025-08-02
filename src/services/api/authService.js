import instance from "@/services/axiosConfig";

export const login = async (data) => {
  return instance.post("auth", data);
};

export const googleLogin = async (code) => {
  return instance.post(`auth/login-google?code=${code}`);
};
