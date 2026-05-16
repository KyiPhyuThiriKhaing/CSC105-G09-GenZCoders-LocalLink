import { Router } from "express";
import {
  applyToJobHandler,
  createJobHandler,
  createJobReviewHandler,
  deleteJobHandler,
  deleteJobReviewHandler,
  getJobByIdHandler,
  getMyApplicationHandler,
  listJobsHandler,
  updateApplicationStatusHandler,
  updateJobReviewHandler,
  updateJobHandler,
} from "../controllers/jobs.controller";

import { requireUser, requireDocumentVerified } from "../middleware/user-auth.middleware";

export const jobsRouter = Router();

jobsRouter.get("/", listJobsHandler);
jobsRouter.get("/:id", getJobByIdHandler);
jobsRouter.post("/", requireUser, requireDocumentVerified, createJobHandler);
jobsRouter.patch("/:id", requireUser, updateJobHandler);
jobsRouter.delete("/:id", requireUser, deleteJobHandler);
jobsRouter.post("/:id/apply", requireUser, requireDocumentVerified, applyToJobHandler);
jobsRouter.get("/:id/my-application", requireUser, getMyApplicationHandler);
jobsRouter.patch("/:id/applications/:applicationId", requireUser, requireDocumentVerified, updateApplicationStatusHandler);
jobsRouter.post("/:id/reviews/:revieweeId", requireUser, requireDocumentVerified, createJobReviewHandler);
jobsRouter.patch("/:id/reviews/:revieweeId", requireUser, requireDocumentVerified, updateJobReviewHandler);
jobsRouter.delete("/:id/reviews/:revieweeId", requireUser, requireDocumentVerified, deleteJobReviewHandler);
