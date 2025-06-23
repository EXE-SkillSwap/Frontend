import instance from "@/api/axiosConfig";

export const getMemberships = async () => {
  return instance.get("memberships");
};

export const buyMembership = async (membershipId) => {
  return instance.post(`memberships/payment/${membershipId}`);
};

export const processMembershipPayment = async (data) => {
  return instance.post("memberships/payment/process", data);
};

export const getMembershipsForAdmin = async () => {
  return instance.get("memberships/admin");
};

export const createMembership = async (data) => {
  return instance.post("memberships", data);
};
