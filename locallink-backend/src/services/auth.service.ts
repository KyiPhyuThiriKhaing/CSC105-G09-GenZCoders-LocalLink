import type { AuthResponse, LoginInput, RegisterInput, VerifyAccountInput } from "../models/auth.model";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { signToken } from "../lib/jwt";

export const registerUser = async (payload: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(payload.password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      email: payload.email,
      fullName: payload.fullName,
      passwordHash,
    },
  });

  const token = signToken({
    sub: newUser.id,
    role: newUser.role,
  });

  return {
    userId: newUser.id,
    token,
  };
};

export const loginUser = async (payload: LoginInput): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const token = signToken({
    sub: user.id,
    role: user.role,
  });

  return {
    userId: user.id,
    token,
  };
};

export const verifyUserAccount = async (_payload: VerifyAccountInput): Promise<{ verified: boolean }> => {
  // Logic to verify code via email or phone - setting user status to ACTIVE
  return { verified: true };
};
