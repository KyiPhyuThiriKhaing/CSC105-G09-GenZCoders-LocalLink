import type { RequestHandler, Response } from "express";
import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
  listSubmissions,
  updateSubmissionStatus,
} from "../services/submissions.service";

const parseStatus = (value: unknown): "PENDING" | "APPROVED" | "REJECTED" | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  if (normalized === "PENDING" || normalized === "APPROVED" || normalized === "REJECTED") {
    return normalized as "PENDING" | "APPROVED" | "REJECTED";
  }
  return null;
};

const asId = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
};

export const listSubmissionsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const data = await listSubmissions();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const getSubmissionByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await getSubmissionById(asId(req.params.id));
    if (!data) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const createSubmissionHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = typeof req.body?.userId === "string" ? req.body.userId : "";
    const documents = Array.isArray(req.body?.documents) ? req.body.documents : [];
    if (!userId || documents.length === 0) {
      res.status(400).json({ message: "userId and documents are required" });
      return;
    }
    const data = await createSubmission({
      userId,
      documents,
      notes: typeof req.body?.notes === "string" ? req.body.notes : undefined,
    });
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

export const updateSubmissionStatusHandler: RequestHandler = async (req, res, next) => {
  try {
    const status = parseStatus(req.body?.status);
    if (!status) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }
    const data = await updateSubmissionStatus(asId(req.params.id), {
      status,
      adminComment: typeof req.body?.adminComment === "string" ? req.body.adminComment : undefined,
      notes: typeof req.body?.notes === "string" ? req.body.notes : undefined,
      reviewedById: typeof req.body?.reviewedById === "string" ? req.body.reviewedById : undefined,
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

export const deleteSubmissionHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteSubmission(asId(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
