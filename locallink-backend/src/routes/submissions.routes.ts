import { Router } from "express";
import {
  createSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionByIdHandler,
  listSubmissionsHandler,
  updateSubmissionStatusHandler,
} from "../controllers/submissions.controller";

export const submissionsRouter = Router();

submissionsRouter.get("/", listSubmissionsHandler);
submissionsRouter.get("/:id", getSubmissionByIdHandler);
submissionsRouter.post("/", createSubmissionHandler);
submissionsRouter.patch("/:id/status", updateSubmissionStatusHandler);
submissionsRouter.delete("/:id", deleteSubmissionHandler);
