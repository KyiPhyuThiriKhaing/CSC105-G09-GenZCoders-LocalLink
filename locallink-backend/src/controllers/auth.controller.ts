import type { RequestHandler, Response } from "express";
import { ZodError } from "zod";
import {
  addSkillSchema,
  loginSchema,
  registerSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "../models/auth.model";
import { prisma } from "../lib/prisma";
import {
  addUserSkill,
  listUserSkills,
  loginUser,
  registerUser,
  removeUserSkill,
  requestEmailVerification,
  updateUserPassword,
  updateUserProfile,
  verifyUserAccount,
  getUserHistory,
} from "../services/auth.service";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

const sendNotImplemented = (res: Response, feature: string): void => {
  res.status(501).json({ message: `${feature} is not implemented yet` });
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const data = await registerUser(payload);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "register");
      return;
    }
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    if (error instanceof Error && error.message === "User already exists with this email") {
      res.status(409).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const data = await loginUser(payload);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "login");
      return;
    }
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    if (error instanceof Error && error.message === "Invalid email or password") {
      res.status(401).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const logout: RequestHandler = async (_req, res) => {
  res.status(200).json({ message: "Logged out" });
};

export const me: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as { userId?: string }).userId;
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        emailVerifiedAt: true,
        emailVerificationRequestedAt: true,
        idVerifiedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const verifyAccount: RequestHandler = async (req, res, next) => {
  try {
    const data = await verifyUserAccount(req.body);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "verify account");
      return;
    }
    next(error);
  }
};

const getUserId = (req: Parameters<RequestHandler>[0]): string | undefined =>
  (req as { userId?: string }).userId;

export const updateMe: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }

    const payload = updateProfileSchema.parse(req.body);
    const data = await updateUserProfile(userId, payload);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    if (error instanceof Error && error.message === "Email is already in use") {
      res.status(409).json({ message: error.message });
      return;
    }
    if (error instanceof Error && error.message === "Phone number is already in use") {
      res.status(409).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }

    const payload = updatePasswordSchema.parse(req.body);
    await updateUserPassword(userId, payload);
    res.status(200).json({ data: { updated: true } });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    if (error instanceof Error && error.message === "Current password is incorrect") {
      res.status(400).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const getMySkills: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }
    const data = await listUserSkills(userId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const addMySkill: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }
    const payload = addSkillSchema.parse(req.body);
    const data = await addUserSkill(userId, payload);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    next(error);
  }
};

export const requestMyEmailVerification: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }
    const data = await requestEmailVerification(userId);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === "Email is already verified") {
      res.status(409).json({ message: error.message });
      return;
    }
    if (error instanceof Error && error.message === "Email verification already requested") {
      res.status(409).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const removeMySkill: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }
    const rawName = req.params.name;
    const skillName = decodeURIComponent(
      Array.isArray(rawName) ? rawName[0] ?? "" : rawName ?? "",
    ).trim();
    if (!skillName) {
      res.status(400).json({ message: "Skill name is required" });
      return;
    }
    const data = await removeUserSkill(userId, skillName);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const getMyHistory: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: 'Missing auth token' });
      return;
    }
    const data = await getUserHistory(userId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
