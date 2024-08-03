import { z } from "zod";

const registerSchema = z.object({
  firstName: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(2, { message: "Firstname must be at least 2 characters long" }),
  lastName: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(2, { message: "Lastname must be at least 2 characters long" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be valid",
    })
    .email("Invalid email address")
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .length(6, { message: "Password must be exactly 6 characters long" })
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be valid",
    })
    .email("Invalid email address")
    .trim(),
    password: z
    .string({ required_error: "Password is required" })
    .length(6, { message: "Password must be exactly 6 characters long" })
});

export  { registerSchema, loginSchema };
