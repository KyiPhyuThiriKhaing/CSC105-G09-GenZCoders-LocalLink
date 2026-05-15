import type { RequestHandler } from "express";
import { z } from "zod";
import {
  adminLogin,
  changeAdminPassword,
  createAdmin,
  getAdminProfile,
  getDashboardStats,
  listAdminActions,
  listAdmins,
  listAdminUsers,
  updateAdminAccountStatus,
  updateAdminUserStatus,
  deleteAdminUser,
  listAdminSubmissions,
  getAdminSubmissionById,
  updateAdminSubmissionStatus,
} from "../services/admin.service";
import type { AccountStatus, AdminActionType, VerificationStatus } from "../services/admin.service";

const asId = (value: unknown): string => {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }
  return typeof value === "string" ? value : "";
};

const asNumber = (value: unknown, fallback: number): number => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string") return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parseAccountStatus = (value: unknown): AccountStatus | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  if (normalized === "ACTIVE" || normalized === "PENDING" || normalized === "SUSPENDED") {
    return normalized as AccountStatus;
  }
  return null;
};

const parseVerificationStatus = (value: unknown): VerificationStatus | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  if (normalized === "PENDING" || normalized === "APPROVED" || normalized === "REJECTED") {
    return normalized as VerificationStatus;
  }
  return null;
};

const parseAdminActionType = (value: unknown): AdminActionType | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  if (
    normalized === "VERIFY_APPROVE" ||
    normalized === "VERIFY_REJECT" ||
    normalized === "USER_SUSPEND" ||
    normalized === "USER_ACTIVATE" ||
    normalized === "USER_DELETE"
  ) {
    return normalized as AdminActionType;
  }
  return null;
};

const getAdminActorId = (req: Parameters<RequestHandler>[0]): string | undefined =>
  (req as { adminUserId?: string }).adminUserId;

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const createAdminSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export const adminLoginHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = adminLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid login input", errors: parsed.error.flatten() });
      return;
    }
    const { email, password } = parsed.data;
    const data = await adminLogin(email, password);
    if (!data) {
      res.status(401).json({ message: "Invalid admin credentials" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStatsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const data = await getDashboardStats();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const getAdminProfileHandler: RequestHandler = async (req, res, next) => {
  try {
    const adminId = getAdminActorId(req);
    if (!adminId) {
      res.status(401).json({ message: "Missing admin identity" });
      return;
    }

    const data = await getAdminProfile(adminId);
    if (!data) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const listAdminsHandler: RequestHandler = async (req, res, next) => {
  try {
    const page = asNumber(req.query.page, 1);
    const pageSize = asNumber(req.query.pageSize, 10);
    const status = parseAccountStatus(req.query.status);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const sort = typeof req.query.sort === "string" ? req.query.sort : "latest";

    const data = await listAdmins({ page, pageSize, status, search, sort });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createAdminHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = createAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid admin input", errors: parsed.error.flatten() });
      return;
    }

    const data = await createAdmin(parsed.data);
    if (!data) {
      res.status(409).json({ message: "Admin already exists" });
      return;
    }

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

export const updateAdminAccountStatusHandler: RequestHandler = async (req, res, next) => {
  try {
    const status = parseAccountStatus(req.body?.status);
    if (!status) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const actorId = getAdminActorId(req);
    const targetId = asId(req.params.id);
    if (actorId && targetId === actorId && status !== "ACTIVE") {
      res.status(400).json({ message: "Cannot deactivate your own admin account" });
      return;
    }

    const data = await updateAdminAccountStatus(targetId, status);
    if (!data) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const changeAdminPasswordHandler: RequestHandler = async (req, res, next) => {
  try {
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid password input", errors: parsed.error.flatten() });
      return;
    }

    const adminId = getAdminActorId(req);
    if (!adminId) {
      res.status(401).json({ message: "Missing admin identity" });
      return;
    }

    const result = await changeAdminPassword(
      adminId,
      parsed.data.currentPassword,
      parsed.data.newPassword,
    );

    if (result === null) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    if (result === false) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
};

export const listAdminActionsHandler: RequestHandler = async (req, res, next) => {
  try {
    const page = asNumber(req.query.page, 1);
    const pageSize = asNumber(req.query.pageSize, 20);
    const action = parseAdminActionType(req.query.action);
    const actorId = typeof req.query.actorId === "string" ? req.query.actorId : null;
    const targetUserId = typeof req.query.targetUserId === "string" ? req.query.targetUserId : null;

    const data = await listAdminActions({ page, pageSize, action, actorId, targetUserId });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const listAdminUsersHandler: RequestHandler = async (req, res, next) => {
  try {
    const page = asNumber(req.query.page, 1);
    const pageSize = asNumber(req.query.pageSize, 10);
    const status = parseAccountStatus(req.query.status);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const sort = typeof req.query.sort === "string" ? req.query.sort : "latest";

    const data = await listAdminUsers({ page, pageSize, status, search, sort });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateAdminUserStatusHandler: RequestHandler = async (req, res, next) => {
  try {
    const status = parseAccountStatus(req.body?.status);
    if (!status) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }
    const actorId = getAdminActorId(req);
    const data = await updateAdminUserStatus(asId(req.params.id), status, actorId);
    if (!data) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const actorId = getAdminActorId(req);
    const deleted = await deleteAdminUser(asId(req.params.id), actorId);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const listAdminSubmissionsHandler: RequestHandler = async (req, res, next) => {
  try {
    const page = asNumber(req.query.page, 1);
    const pageSize = asNumber(req.query.pageSize, 10);
    const status = parseVerificationStatus(req.query.status);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const sort = typeof req.query.sort === "string" ? req.query.sort : "latest";

    const data = await listAdminSubmissions({ page, pageSize, status, search, sort });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAdminSubmissionByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await getAdminSubmissionById(asId(req.params.id));
    if (!data) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const updateAdminSubmissionStatusHandler: RequestHandler = async (req, res, next) => {
  try {
    const status = parseVerificationStatus(req.body?.status);
    if (!status) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const actorId = getAdminActorId(req);
    const adminComment = typeof req.body?.adminComment === "string" ? req.body.adminComment : undefined;
    const notes = typeof req.body?.notes === "string" ? req.body.notes : undefined;

    const data = await updateAdminSubmissionStatus(asId(req.params.id), {
      status,
      actorId,
      adminComment,
      notes,
    });

    if (!data) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
