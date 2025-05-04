
import * as z from "zod";

// Admin token for verification
export const ADMIN_TOKEN = "270404";

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  isAdmin: z.boolean().default(false)
});

// Sign up form validation schema
export const signupSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Password minimal 6 karakter"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  isAdmin: z.boolean().default(false),
  adminToken: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
}).refine(
  (data) => !data.isAdmin || (data.isAdmin && data.adminToken === ADMIN_TOKEN),
  {
    message: "Token admin tidak valid",
    path: ["adminToken"],
  }
);

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
