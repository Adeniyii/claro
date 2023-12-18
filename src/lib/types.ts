import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email("Invalid email"),
  password: z.string().min(6, "Password is required").describe("Password"),
});