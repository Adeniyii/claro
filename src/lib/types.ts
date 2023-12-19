import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().describe("email").email("invalid email"),
  password: z.string().min(6, "password is required").describe("password"),
});

export const SignupFormSchema = z
  .object({
    email: z.string().describe("email").email("invalid email"),
    password: z
      .string()
      .min(6, "password must be minimum 6 characters")
      .describe("password"),
    confirmPassword: z
      .string()
      .min(6, "password must be minimum 6 characters")
      .describe("confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
