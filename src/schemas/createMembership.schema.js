import { z } from "zod";

export const createMembershipSchema = z.object({
  name: z.string().min(1, "Tên gói thành viên là bắt buộc"),
  price: z.number().min(10000, "Giá quá thấp"),
  duration: z.number().min(7, "Thời lượng quá thấp"),
  description: z.string().optional(),
  features: z.string().min(1, "Tính năng là bắt buộc"),
});
