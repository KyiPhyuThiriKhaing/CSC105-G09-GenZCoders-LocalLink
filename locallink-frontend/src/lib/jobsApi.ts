import axios from "axios";
import { apiClient } from "./apiClient";

export type ApplicationStatus =
  | "APPLIED"
  | "CONTACTED"
  | "OFFERED"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN"
  | "COMPLETED";

export type JobStatus = "OPEN" | "ASSIGNED" | "COMPLETED" | "CANCELLED";

export type MyApplication = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
};

const parseError = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      fallback;
    return new Error(message);
  }
  return error instanceof Error ? error : new Error(fallback);
};

export const applyToJob = async (
  jobId: string,
  message?: string,
): Promise<MyApplication> => {
  try {
    const result = await apiClient.post<{ data: MyApplication }>(
      `/jobs/${jobId}/apply`,
      message ? { message } : {},
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to apply to this job.");
  }
};

export const fetchMyApplication = async (
  jobId: string,
): Promise<MyApplication | null> => {
  try {
    const result = await apiClient.get<{ data: MyApplication | null }>(
      `/jobs/${jobId}/my-application`,
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to check application status.");
  }
};

export type ReviewStatus = "CONTACTED" | "OFFERED" | "ACCEPTED" | "REJECTED" | "COMPLETED";

export type JobReview = {
  id: string;
  jobId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
  reviewer: { fullName: string; avatarUrl: string | null };
  reviewee: { fullName: string; avatarUrl: string | null };
  job: { title: string };
};

export const createJobReview = async (
  jobId: string,
  revieweeId: string,
  rating: number,
  comment?: string | null,
): Promise<JobReview> => {
  try {
    const result = await apiClient.post<{ data: JobReview }>(
      `/jobs/${jobId}/reviews/${revieweeId}`,
      { rating, comment: comment ?? null },
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to create review.");
  }
};

export const updateJobReview = async (
  jobId: string,
  revieweeId: string,
  rating: number,
  comment?: string | null,
): Promise<JobReview> => {
  try {
    const result = await apiClient.patch<{ data: JobReview }>(
      `/jobs/${jobId}/reviews/${revieweeId}`,
      { rating, comment: comment ?? null },
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to update review.");
  }
};

export const deleteJobReview = async (
  jobId: string,
  revieweeId: string,
): Promise<JobReview> => {
  try {
    const result = await apiClient.delete<{ data: JobReview }>(
      `/jobs/${jobId}/reviews/${revieweeId}`,
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to delete review.");
  }
};

export const updateApplicationStatus = async (
  jobId: string,
  applicationId: string,
  status: ReviewStatus,
) => {
  try {
    const result = await apiClient.patch<{ data: { id: string; status: ApplicationStatus } }>(
      `/jobs/${jobId}/applications/${applicationId}`,
      { status },
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to update application.");
  }
};

export const updateJobStatus = async (jobId: string, status: JobStatus) => {
  try {
    const result = await apiClient.patch<{ data: { id: string; status: JobStatus } }>(
      `/jobs/${jobId}`,
      { status },
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to update job status.");
  }
};
