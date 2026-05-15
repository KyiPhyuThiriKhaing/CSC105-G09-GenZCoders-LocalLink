import { apiClient } from "./apiClient";

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type VerificationDocument = {
  id?: string;
  fileName: string;
  fileUrl: string;
  mimeType?: string | null;
  fileSize?: number | null;
};

export type VerificationSubmission = {
  id: string;
  userId: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string | null;
  notes?: string | null;
  adminComment?: string | null;
  documents: VerificationDocument[];
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

const parseApiError = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return new Error(error.message || fallback);
  }
  return new Error(fallback);
};

export const fetchMySubmission = async (userId?: string) => {
  try {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    const result = await apiClient.get<{ data: VerificationSubmission | null }>(
      `/submissions/me${query}`,
    );
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to load verification submission.");
  }
};

export const upsertMySubmission = async (payload: {
  userId?: string;
  documents: VerificationDocument[];
  notes?: string;
}) => {
  try {
    const result = await apiClient.patch<{ data: VerificationSubmission }>(
      "/submissions/me",
      payload,
    );
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to submit verification request.");
  }
};

export const uploadVerificationDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${apiBaseUrl}/submissions/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed. Please try again.");
  }

  const payload = (await response.json()) as { data: VerificationDocument };
  return payload.data;
};
