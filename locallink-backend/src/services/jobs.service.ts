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

export const applyToJob = async (
  jobId: string,
  applicantId: string,
  message?: string,
) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, posterId: true, status: true },
  });

  if (!job) {
    throw new Error("Job not found");
  }
  if (job.posterId === applicantId) {
    throw new Error("You cannot apply to your own job");
  }
  if (job.status !== "OPEN") {
    throw new Error("This job is no longer accepting applications");
  }

  const existing = await prisma.jobApplication.findUnique({
    where: { jobId_applicantId: { jobId, applicantId } },
  });
  if (existing) {
    throw new Error("You have already applied to this job");
  }

  return prisma.jobApplication.create({
    data: {
      jobId,
      applicantId,
      status: "APPLIED",
      message: message?.trim() || null,
    },
  });
};

export const getApplicationForUser = async (jobId: string, applicantId: string) => {
  return prisma.jobApplication.findUnique({
    where: { jobId_applicantId: { jobId, applicantId } },
    select: { id: true, status: true, createdAt: true },
  });
};

type ReviewStatus = "CONTACTED" | "OFFERED" | "ACCEPTED" | "REJECTED";

const REVIEW_STATUSES: ReviewStatus[] = ["CONTACTED", "OFFERED", "ACCEPTED", "REJECTED"];

export const updateApplicationStatus = async (
  jobId: string,
  applicationId: string,
  reviewerId: string,
  status: string,
) => {
  if (!REVIEW_STATUSES.includes(status as ReviewStatus)) {
    throw new Error("Invalid application status");
  }

  const application = await prisma.jobApplication.findUnique({
    where: { id: applicationId },
    select: { id: true, jobId: true, job: { select: { posterId: true } } },
  });

  if (!application || application.jobId !== jobId) {
    throw new Error("Application not found");
  }
  if (application.job.posterId !== reviewerId) {
    throw new Error("Forbidden");
  }

  const next = status as ReviewStatus;
  const now = new Date();

  return prisma.jobApplication.update({
    where: { id: applicationId },
    data: {
      status: next,
      offeredAt: next === "OFFERED" || next === "ACCEPTED" ? now : undefined,
      acceptedAt: next === "ACCEPTED" ? now : undefined,
    },
    include: { applicant: { select: { id: true, fullName: true, avatarUrl: true } } },
  });
};
