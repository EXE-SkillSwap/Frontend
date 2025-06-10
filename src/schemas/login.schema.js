import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("Email không hợp lệ").max(100, "Email quá dài"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(100, "Mật khẩu quá dài"),
  })
  .strict();
