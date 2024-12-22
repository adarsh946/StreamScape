import z from "zod";

export const signupSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "passowrd must contain at least 8 characters"),
});
