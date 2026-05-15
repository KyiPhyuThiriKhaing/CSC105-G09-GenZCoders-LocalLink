import { Router } from "express";
import {
  applyToJobHandler,
  createJobHandler,
  deleteJobHandler,
  getJobByIdHandler,
  getMyApplicationHandler,
  listJobsHandler,
  updateApplicationStatusHandler,
  updateJobHandler,
} from "../controllers/jobs.controller";

import { requireUser } from "../middleware/user-auth.middleware";

export const jobsRouter = Router();

jobsRouter.get("/", listJobsHandler);
jobsRouter.get("/:id", getJobByIdHandler);
jobsRouter.post("/", requireUser, createJobHandler);
jobsRouter.patch("/:id", requireUser, updateJobHandler);
jobsRouter.delete("/:id", requireUser, deleteJobHandler);
jobsRouter.post("/:id/apply", requireUser, applyToJobHandler);
jobsRouter.get("/:id/my-application", requireUser, getMyApplicationHandler);
jobsRouter.patch("/:id/applications/:applicationId", requireUser, updateApplicationStatusHandler);
