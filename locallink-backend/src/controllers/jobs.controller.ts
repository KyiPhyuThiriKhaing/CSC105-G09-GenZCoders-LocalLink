import type { RequestHandler, Response } from "express";
import { createJob, deleteJob, getJobById, listJobs, updateJob } from "../services/jobs.service";

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
    const data = await createJob(req.body);
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
    const data = await updateJob(asId(req.params.id), req.body);
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
