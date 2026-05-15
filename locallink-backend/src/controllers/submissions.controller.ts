import type { Request, RequestHandler, Response } from "express";
import path from "path";
import fs from "fs";
import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
  getSubmissionByUserId,
  getSubmissionDocumentById,
  listSubmissions,
  upsertSubmissionForUser,
  updateSubmissionStatus,
} from "../services/submissions.service";
import { uploadsDir } from "../lib/uploads";

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

export const uploadSubmissionDocumentHandler: RequestHandler = (req, res) => {
  const file = (req as Request & {
    file?: { originalname: string; filename: string; mimetype: string; size: number };
  }).file;
  if (!file) {
    res.status(400).json({ message: "File is required" });
    return;
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const fileUrl = `${baseUrl}/uploads/${file.filename}`;

  res.status(201).json({
    data: {
      fileName: file.originalname,
      fileUrl,
      mimeType: file.mimetype,
      fileSize: file.size,
    },
  });
};

export const getMySubmissionHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId =
      (req as { userId?: string }).userId ??
      (typeof req.query.userId === "string" ? req.query.userId : "");
    if (!userId) {
      res.status(400).json({ message: "userId is required" });
      return;
    }

    const data = await getSubmissionByUserId(userId);
    if (!data) {
      res.status(200).json({ data: null });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const upsertMySubmissionHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId =
      (req as { userId?: string }).userId ??
      (typeof req.body?.userId === "string" ? req.body.userId : "");
    if (!userId) {
      res.status(400).json({ message: "userId is required" });
      return;
    }

    const documents = Array.isArray(req.body?.documents) ? req.body.documents : [];
    if (documents.length === 0) {
      res.status(400).json({ message: "At least one document is required" });
      return;
    }

    const data = await upsertSubmissionForUser({
      userId,
      documents,
      notes: typeof req.body?.notes === "string" ? req.body.notes : undefined,
    });

    if (!data) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === "Submission already approved") {
      res.status(409).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const downloadSubmissionDocumentHandler: RequestHandler = async (req, res, next) => {
  try {
    const documentId = asId(req.params.documentId);
    const document = await getSubmissionDocumentById(documentId);

    if (!document) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    const localFileName = document.fileUrl.split("/uploads/").pop();
    if (!localFileName) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    const filePath = path.join(uploadsDir, localFileName);
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    res.setHeader("Content-Type", document.mimeType ?? "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${document.fileName}"`);
    res.sendFile(filePath);
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
