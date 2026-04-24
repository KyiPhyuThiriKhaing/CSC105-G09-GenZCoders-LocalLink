import type { RequestHandler, Response } from "express";
import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
  listSubmissions,
  updateSubmissionStatus,
} from "../services/submissions.service";

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

export const listSubmissionsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const data = await listSubmissions();
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "list submissions");
      return;
    }
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
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "get submission by id");
      return;
    }
    next(error);
  }
};

export const createSubmissionHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await createSubmission(req.body);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "create submission");
      return;
    }
    next(error);
  }
};

export const updateSubmissionStatusHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await updateSubmissionStatus(asId(req.params.id), req.body.status);
    if (!data) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "update submission status");
      return;
    }
    next(error);
  }
};

export const deleteSubmissionHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteSubmission(asId(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "delete submission");
      return;
    }
    next(error);
  }
};
