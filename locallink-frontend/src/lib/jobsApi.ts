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
