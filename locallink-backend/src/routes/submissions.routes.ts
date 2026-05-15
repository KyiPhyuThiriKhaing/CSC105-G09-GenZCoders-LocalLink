import { Router } from "express";
import {
  createSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionByIdHandler,
  listSubmissionsHandler,
  downloadSubmissionDocumentHandler,
  updateSubmissionStatusHandler,
  uploadSubmissionDocumentHandler,
} from "../controllers/submissions.controller";
import { upload } from "../lib/uploads";

export const submissionsRouter = Router();

submissionsRouter.get("/", listSubmissionsHandler);
submissionsRouter.get("/:id", getSubmissionByIdHandler);
submissionsRouter.get("/documents/:documentId/download", downloadSubmissionDocumentHandler);
submissionsRouter.post("/upload", upload.single("file"), uploadSubmissionDocumentHandler);
submissionsRouter.post("/", createSubmissionHandler);
submissionsRouter.patch("/:id/status", updateSubmissionStatusHandler);
submissionsRouter.delete("/:id", deleteSubmissionHandler);
