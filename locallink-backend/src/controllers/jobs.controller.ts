import type { RequestHandler, Response } from "express";
import { z } from "zod";
import {
  applyToJob,
  createJob,
  createJobReview,
  deleteJob,
  deleteJobReview,
  getApplicationForUser,
  getJobById,
  listJobs,
  updateJobReview,
  updateApplicationStatus,
  updateJob,
} from "../services/jobs.service";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

const sendNotImplemented = (res: Response, feature: string): void => {
  res.status(501).json({ message: `${feature} is not implemented yet` });
};

const asId = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
};

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional().nullable(),
});

export const listJobsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const data = await listJobs();
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "list jobs");
      return;
    }
    next(error);
  }
};

export const getJobByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await getJobById(asId(req.params.id));
    if (!data) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "get job by id");
      return;
    }
    next(error);
  }
};

export const createJobHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as { userId?: string }).userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const payload = { ...req.body, posterId: userId };
    const data = await createJob(payload);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "create job");
      return;
    }
    next(error);
  }
};

export const updateJobHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as { userId?: string }).userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const data = await updateJob(asId(req.params.id), req.body, userId);
    if (!data) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "update job");
      return;
    }
    if (error instanceof Error && error.message === "Forbidden") {
      res.status(403).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const deleteJobHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteJob(asId(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "delete job");
      return;
    }
    next(error);
  }
};

export const applyToJobHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as { userId?: string }).userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const jobId = asId(req.params.id);
    const message = typeof req.body?.message === "string" ? req.body.message : undefined;
    const data = await applyToJob(jobId, userId, message);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Job not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      if (
        error.message === "You cannot apply to your own job" ||
        error.message === "This job is no longer accepting applications" ||
        error.message === "You have already applied to this job"
      ) {
        res.status(409).json({ message: error.message });
        return;
      }
    }
    next(error);
  }
};

export const getMyApplicationHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as { userId?: string }).userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const data = await getApplicationForUser(asId(req.params.id), userId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatusHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as { userId?: string }).userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const jobId = asId(req.params.id);
    const applicationId = asId(req.params.applicationId);
    const status = typeof req.body?.status === "string" ? req.body.status : "";

    const data = await updateApplicationStatus(jobId, applicationId, userId, status);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid application status") {
        res.status(400).json({ message: error.message });
        return;
      }
      if (error.message === "Application not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === "Forbidden") {
        res.status(403).json({ message: error.message });
        return;
      }
    }
    next(error);
  }
};

export const createJobReviewHandler: RequestHandler = async (req, res, next) => {
  try {
    const reviewerId = (req as { userId?: string }).userId;
    if (!reviewerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const jobId = asId(req.params.id);
    const revieweeId = asId(req.params.revieweeId);
    const payload = reviewSchema.parse(req.body);
    const data = await createJobReview(jobId, reviewerId, revieweeId, payload.rating, payload.comment ?? null);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    if (error instanceof Error) {
      if (error.message === "You cannot review yourself") {
        res.status(409).json({ message: error.message });
        return;
      }
      if (error.message === "You have already reviewed this applicant for this job") {
        res.status(409).json({ message: error.message });
        return;
      }
      if (error.message === "Job not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === "Applicant is not completed on this job") {
        res.status(400).json({ message: error.message });
        return;
      }
      if (error.message === "Forbidden") {
        res.status(403).json({ message: error.message });
        return;
      }
    }
    next(error);
  }
};

export const updateJobReviewHandler: RequestHandler = async (req, res, next) => {
  try {
    const reviewerId = (req as { userId?: string }).userId;
    if (!reviewerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const jobId = asId(req.params.id);
    const revieweeId = asId(req.params.revieweeId);
    const payload = reviewSchema.parse(req.body);
    const data = await updateJobReview(jobId, reviewerId, revieweeId, payload.rating, payload.comment ?? null);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    if (error instanceof Error) {
      if (error.message === "You cannot review yourself") {
        res.status(409).json({ message: error.message });
        return;
      }
      if (error.message === "Review not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === "Review has been deleted") {
        res.status(409).json({ message: error.message });
        return;
      }
      if (error.message === "Applicant is not completed on this job") {
        res.status(400).json({ message: error.message });
        return;
      }
      if (error.message === "Forbidden") {
        res.status(403).json({ message: error.message });
        return;
      }
    }
    next(error);
  }
};

export const deleteJobReviewHandler: RequestHandler = async (req, res, next) => {
  try {
    const reviewerId = (req as { userId?: string }).userId;
    if (!reviewerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const jobId = asId(req.params.id);
    const revieweeId = asId(req.params.revieweeId);
    const data = await deleteJobReview(jobId, reviewerId, revieweeId);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Review not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === "Review has been deleted") {
        res.status(409).json({ message: error.message });
        return;
      }
      if (error.message === "Applicant is not completed on this job") {
        res.status(400).json({ message: error.message });
        return;
      }
      if (error.message === "Forbidden") {
        res.status(403).json({ message: error.message });
        return;
      }
      if (error.message === "You cannot review yourself") {
        res.status(409).json({ message: error.message });
        return;
      }
    }
    next(error);
  }
};
