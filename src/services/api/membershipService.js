import instance from "@/services/axiosConfig";

export const getMemberships = async () => {
  return instance.get("memberships");
};

export const buyMembership = async (membershipId) => {
  return instance.post(`memberships/payment/${membershipId}`);
};

export const processMembershipPayment = async (data) => {
  return instance.post("memberships/payment/process", data);
};

export const getMembershipsForAdmin = async (
  page,
  size,
  searchString,
  sortBy,
  isDeleted
) => {
  return instance.get(
    `memberships/admin?page=${page}&size=${size}&searchString=${searchString}&sort=${sortBy}&isDeleted=${isDeleted}`
  );
};

export const createMembership = async (data) => {
  return instance.post("memberships", data);
};

export const cancelPayment = async (orderCode) => {
  return instance.post(`payment/cancel`, { orderCode });
};

export const getUserMembership = async () => {
  return instance.get(`memberships/my`);
};

export const deleteMembership = async (membershipId) => {
  return instance.delete(`memberships/${membershipId}`);
};

export const updateMembership = async (membershipId, data) => {
  return instance.put(`memberships/${membershipId}`, data);
};
