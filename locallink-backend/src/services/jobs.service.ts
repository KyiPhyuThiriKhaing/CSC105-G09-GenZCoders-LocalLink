import type { CreateJobInput, Job, UpdateJobInput } from "../models/job.model";
import { prisma } from "../lib/prisma";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

export const listJobs = async (): Promise<Job[]> => {
  return prisma.job.findMany({ orderBy: { postedAt: "desc" } });
};

export const getJobById = async (id: string): Promise<Job | null> => {
  return prisma.job.findUnique({ 
    where: { id },
    include: { poster: true }
  });
};

export const createJob = async (payload: CreateJobInput): Promise<Job> => {
  if (!payload.posterId) {
    throw new Error("posterId is required to create a job");
  }
  
  return prisma.job.create({
    data: {
      title: payload.title,
      description: payload.description,
      location: payload.location,
      imageUrl: payload.imageUrl,
      payoutText: payload.payoutText,
      durationText: payload.durationText,
      contactInfo: payload.contactInfo,
      requirementsText: payload.requirementsText,
      poster: { connect: { id: payload.posterId } },
      payoutCurrency: "THB",
      status: "OPEN"
    }
  });
};

export const updateJob = async (_id: string, _payload: UpdateJobInput): Promise<Job | null> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const deleteJob = async (_id: string): Promise<void> => {
  throw new Error(NOT_IMPLEMENTED);
};
