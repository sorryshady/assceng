import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z.string({
      required_error: "Email is required",
    }).email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, { message: "Password should be at least 8 characters" }),

    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(8, { message: "Confirm password should be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
