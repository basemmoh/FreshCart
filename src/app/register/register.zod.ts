import * as zod from "zod";

export const registerSchema = zod.object({
  name: zod
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Name can contain letters and spaces only."),
  email: zod
    .string()
    .email("Enter a valid email address."),
  password: zod
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Use at least 8 characters with uppercase and lowercase letters, a number, and a symbol.",
    ),
  rePassword: zod.string().min(1, "Please confirm your password."),
  phone: zod
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number, such as 01012345678."),
  terms: zod.boolean().refine((accepted) => accepted, "Please accept the terms to continue."),
}).refine((values) => values.password === values.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match.",
});
