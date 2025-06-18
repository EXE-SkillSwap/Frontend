import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "Họ là bắt buộc").max(50, "Họ quá dài"),
  lastName: z.string().min(1, "Tên là bắt buộc").max(50, "Tên quá dài"),
  bio: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .refine(
      (val) => !val || /^\d{10,15}$/.test(val),
      "Số điện thoại không hợp lệ"
    ),
});
