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

export const CreateWorkspaceFormSchema = z.object({
    workspaceName: z
        .string()
        .describe('Workspace Name')
        .min(1, 'Workspace name must be min of 1 character'),
    workspaceLogo: z.any(),
});