import instance from "@/services/axiosConfig";

export const getAllSubscriptions = async (
  page,
  size,
  sort,
  status,
  paymentStatus,
  searchString
) => {
  return instance.get(
    `membership-subscriptions/all?page=${page}&size=${size}&sort=${sort}&status=${status}&paymentStatus=${paymentStatus}&searchString=${searchString}`
  );
};
