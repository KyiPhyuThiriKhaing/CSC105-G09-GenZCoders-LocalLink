import type { CreateUserInput, UpdateUserInput, User } from "../models/user.model";
import { prisma } from "../lib/prisma";

export const listUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({ select: { id: true, fullName: true, email: true } });
};

export const getUserById = async (id: string): Promise<any | null> => {
  const u = await prisma.user.findUnique({
    where: { id },
    include: { skills: { include: { skill: true } } },
  });
  if (!u) return null;
  return {
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    phone: u.phone ?? null,
    avatarUrl: u.avatarUrl ?? null,
    bio: u.bio ?? null,
    joinedAt: u.joinedAt,
    emailVerifiedAt: u.emailVerifiedAt ?? null,
    idVerifiedAt: u.idVerifiedAt ?? null,
    skills: u.skills?.map((s) => s.skill.name) ?? [],
  };
};

export const createUser = async (payload: CreateUserInput): Promise<User> => {
  return prisma.user.create({ data: { fullName: payload.fullName, email: payload.email, passwordHash: payload.password, role: payload.role as any } });
};

export const updateUser = async (id: string, payload: UpdateUserInput): Promise<User | null> => {
  return prisma.user.update({ where: { id }, data: { fullName: payload.fullName, email: payload.email, role: payload.role as any } });
};

export const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({ where: { id } });
};
