import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password should be at least 8 characters" }),
});

export const EmailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const ClerkSigninSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
    }),
});

export const ClerkSignupSchema = z
  .object({
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
