import type {
  AddSkillInput,
  AuthResponse,
  AuthUser,
  LoginInput,
  RegisterInput,
  UpdatePasswordInput,
  UpdateProfileInput,
  VerifyAccountInput,
} from "../models/auth.model";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { signToken } from "../lib/jwt";

const userSelect = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  role: true,
  status: true,
  avatarUrl: true,
  location: true,
  bio: true,
  joinedAt: true,
  emailVerifiedAt: true,
  emailVerificationRequestedAt: true,
} as const;

export const registerUser = async (payload: RegisterInput): Promise<AuthResponse> => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(payload.password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      email: normalizedEmail,
      fullName: payload.fullName,
      passwordHash,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      avatarUrl: true,
      location: true,
      bio: true,
      joinedAt: true,
    },
  });

  const token = signToken({
    sub: newUser.id,
    role: newUser.role,
  });

  return {
    userId: newUser.id,
    token,
    user: newUser as AuthUser,
  };
};

export const loginUser = async (payload: LoginInput): Promise<AuthResponse> => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      avatarUrl: true,
      location: true,
      bio: true,
      joinedAt: true,
      passwordHash: true,
    },
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

  const { passwordHash: _passwordHash, ...safeUser } = user;
  return {
    userId: user.id,
    token,
    user: safeUser as AuthUser,
  };
};

export const verifyUserAccount = async (_payload: VerifyAccountInput): Promise<{ verified: boolean }> => {
  // Logic to verify code via email or phone - setting user status to ACTIVE
  return { verified: true };
};

export const updateUserProfile = async (
  userId: string,
  payload: UpdateProfileInput,
): Promise<AuthUser> => {
  const data: Record<string, unknown> = {};

  if (payload.fullName !== undefined) data.fullName = payload.fullName;
  if (payload.email !== undefined) data.email = payload.email.toLowerCase();
  if (payload.phone !== undefined) {
    data.phone = payload.phone === null ? null : payload.phone.trim() || null;
  }
  if (payload.bio !== undefined) {
    data.bio = payload.bio === null ? null : payload.bio.trim() || null;
  }
  if (payload.location !== undefined) {
    data.location = payload.location === null ? null : payload.location.trim() || null;
  }

  if (typeof data.email === "string") {
    const conflict = await prisma.user.findFirst({
      where: { email: data.email as string, NOT: { id: userId } },
      select: { id: true },
    });
    if (conflict) {
      throw new Error("Email is already in use");
    }
  }

  if (typeof data.phone === "string") {
    const conflict = await prisma.user.findFirst({
      where: { phone: data.phone as string, NOT: { id: userId } },
      select: { id: true },
    });
    if (conflict) {
      throw new Error("Phone number is already in use");
    }
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data,
    select: userSelect,
  });

  return updated as AuthUser;
};

export const updateUserPassword = async (
  userId: string,
  payload: UpdatePasswordInput,
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(payload.currentPassword, user.passwordHash);
  if (!isValid) {
    throw new Error("Current password is incorrect");
  }

  const newHash = await bcrypt.hash(payload.newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newHash },
  });
};

export const listUserSkills = async (userId: string): Promise<string[]> => {
  const rows = await prisma.userSkill.findMany({
    where: { userId },
    select: { skill: { select: { name: true } } },
    orderBy: { skill: { name: "asc" } },
  });
  return rows.map((row) => row.skill.name);
};

export const addUserSkill = async (
  userId: string,
  payload: AddSkillInput,
): Promise<string[]> => {
  const name = payload.name.trim();
  const skill = await prisma.skill.upsert({
    where: { name },
    update: {},
    create: { name },
  });

  await prisma.userSkill.upsert({
    where: { userId_skillId: { userId, skillId: skill.id } },
    update: {},
    create: { userId, skillId: skill.id },
  });

  return listUserSkills(userId);
};

export const requestEmailVerification = async (
  userId: string,
): Promise<AuthUser> => {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      emailVerifiedAt: true,
      emailVerificationRequestedAt: true,
    },
  });

  if (!existing) {
    throw new Error("User not found");
  }
  if (existing.emailVerifiedAt) {
    throw new Error("Email is already verified");
  }
  if (existing.emailVerificationRequestedAt) {
    throw new Error("Email verification already requested");
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { emailVerificationRequestedAt: new Date() },
    select: userSelect,
  });

  return updated as AuthUser;
};

export const removeUserSkill = async (
  userId: string,
  skillName: string,
): Promise<string[]> => {
  const skill = await prisma.skill.findUnique({
    where: { name: skillName },
    select: { id: true },
  });
  if (skill) {
    await prisma.userSkill
      .delete({ where: { userId_skillId: { userId, skillId: skill.id } } })
      .catch(() => undefined);
  }
  return listUserSkills(userId);
};
export const getUserHistory = async (userId: string) => {
  const applications = await prisma.jobApplication.findMany({
    where: { applicantId: userId },
    include: { job: { include: { poster: true } } },
    orderBy: { createdAt: 'desc' }
  });

  const postedJobs = await prisma.job.findMany({
    where: { posterId: userId },
    include: { _count: { select: { applications: true } }, applications: { include: { applicant: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return { applications, postedJobs };
};
