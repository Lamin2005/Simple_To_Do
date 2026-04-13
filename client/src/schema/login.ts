import zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email can not be empty")
    .email("Invalid email address  format"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});
