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

export type ReviewStatus = "CONTACTED" | "OFFERED" | "ACCEPTED" | "REJECTED";

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
