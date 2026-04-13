import zod from "zod";

export const registerSchema = zod.object({
  name: zod.string().min(1, "Name can not be empty"),
  email: zod
    .string()
    .min(1, "Email can not be empty")
    .email("Invalid email address  format"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});
