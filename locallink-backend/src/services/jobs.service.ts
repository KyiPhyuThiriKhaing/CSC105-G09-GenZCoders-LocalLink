import type { CreateJobInput, Job, UpdateJobInput } from "../models/job.model";
import { prisma } from "../lib/prisma";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

export const listJobs = async (): Promise<Job[]> => {
  return prisma.job.findMany({ orderBy: { postedAt: "desc" } });
};

export const getJobById = async (_id: string): Promise<Job | null> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const createJob = async (_payload: CreateJobInput): Promise<Job> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const updateJob = async (_id: string, _payload: UpdateJobInput): Promise<Job | null> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const deleteJob = async (_id: string): Promise<void> => {
  throw new Error(NOT_IMPLEMENTED);
};
