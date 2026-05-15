import { Router } from "express";
import {
  createSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionByIdHandler,
  getMySubmissionHandler,
  listSubmissionsHandler,
  downloadSubmissionDocumentHandler,
  upsertMySubmissionHandler,
  updateSubmissionStatusHandler,
  uploadSubmissionDocumentHandler,
} from "../controllers/submissions.controller";
import { upload } from "../lib/uploads";

export const submissionsRouter = Router();

submissionsRouter.get("/", listSubmissionsHandler);
submissionsRouter.get("/me", getMySubmissionHandler);
submissionsRouter.get("/documents/:documentId/download", downloadSubmissionDocumentHandler);
submissionsRouter.get("/:id", getSubmissionByIdHandler);
submissionsRouter.post("/upload", upload.single("file"), uploadSubmissionDocumentHandler);
submissionsRouter.post("/", createSubmissionHandler);
submissionsRouter.patch("/me", upsertMySubmissionHandler);
submissionsRouter.patch("/:id/status", updateSubmissionStatusHandler);
submissionsRouter.delete("/:id", deleteSubmissionHandler);
