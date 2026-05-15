import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateProfileSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required").optional(),
    email: z.string().trim().email("Please enter a valid email address").optional(),
    phone: z
      .string()
      .trim()
      .min(5, "Please enter a valid phone number")
      .max(30, "Phone number is too long")
      .nullable()
      .optional(),
    bio: z.string().trim().max(500, "Bio is too long").nullable().optional(),
    location: z.string().trim().max(120).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "No fields provided to update",
  });

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export const addSkillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required").max(60, "Skill name is too long"),
});

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyAccountInput {
  code: string;
}

export interface UpdateProfileInput {
  fullName?: string;
  email?: string;
  phone?: string | null;
  bio?: string | null;
  location?: string | null;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface AddSkillInput {
  name: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  role: string;
  status: string;
  avatarUrl?: string | null;
  location?: string | null;
  bio?: string | null;
  joinedAt: Date;
  emailVerifiedAt?: Date | null;
  emailVerificationRequestedAt?: Date | null;
}

export interface AuthResponse {
  userId: string;
  token: string;
  user: AuthUser;
}
