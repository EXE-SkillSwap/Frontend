import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Họ là bắt buộc").max(50, "Họ quá dài"),
    lastName: z.string().min(1, "Tên là bắt buộc").max(50, "Tên quá dài"),
    email: z.string().email("Email không hợp lệ").max(100, "Email quá dài"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(100, "Mật khẩu quá dài"),
    confirmPassword: z
      .string()
      .min(8, "Xác nhận mật khẩu phải có ít nhất 8 ký tự")
      .max(100, "Xác nhận mật khẩu quá dài"),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    } else if (confirmPassword.trim() === "" || password.trim() === "") {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không được để trống",
        path: ["confirmPassword", "password"],
      });
    }
  });
