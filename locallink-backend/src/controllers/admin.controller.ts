import type { RequestHandler } from "express";
import {
  getDashboardStats,
  listAdminUsers,
  updateAdminUserStatus,
  deleteAdminUser,
  listAdminSubmissions,
  getAdminSubmissionById,
  updateAdminSubmissionStatus,
} from "../services/admin.service";
import type { AccountStatus, VerificationStatus } from "../services/admin.service";

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

export const getDashboardStatsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const data = await getDashboardStats();
    res.status(200).json({ data });
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
    const actorId = typeof req.body?.actorId === "string" ? req.body.actorId : undefined;
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
    const actorId = typeof req.body?.actorId === "string" ? req.body.actorId : undefined;
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

    const actorId = typeof req.body?.actorId === "string" ? req.body.actorId : undefined;
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
