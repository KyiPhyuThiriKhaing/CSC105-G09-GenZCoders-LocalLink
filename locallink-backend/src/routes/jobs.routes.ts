import { Router } from "express";
import {
  createJobHandler,
  deleteJobHandler,
  getJobByIdHandler,
  listJobsHandler,
  updateJobHandler,
} from "../controllers/jobs.controller";

export const jobsRouter = Router();

jobsRouter.get("/", listJobsHandler);
jobsRouter.get("/:id", getJobByIdHandler);
jobsRouter.post("/", createJobHandler);
jobsRouter.patch("/:id", updateJobHandler);
jobsRouter.delete("/:id", deleteJobHandler);
