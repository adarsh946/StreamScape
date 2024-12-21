import z from "zod";

const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "at least 3 characters are allowed")
    .max(10, "maximum 10 characters are allowed"),
  email: z.string().email(),
  password: z.string().min(8, "password must be at least 8 characters"),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { signInSchema, signUpSchema };
