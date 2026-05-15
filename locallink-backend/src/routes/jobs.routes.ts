import { Router } from "express";
import {
  createJobHandler,
  deleteJobHandler,
  getJobByIdHandler,
  listJobsHandler,
  updateJobHandler,
} from "../controllers/jobs.controller";

import { requireUser } from "../middleware/user-auth.middleware";

export const jobsRouter = Router();

jobsRouter.get("/", listJobsHandler);
jobsRouter.get("/:id", getJobByIdHandler);
jobsRouter.post("/", requireUser, createJobHandler);
jobsRouter.patch("/:id", requireUser, updateJobHandler);
jobsRouter.delete("/:id", requireUser, deleteJobHandler);
