type ApiError = {
  message?: string;
};

export class ApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const ADMIN_TOKEN_KEY = "admin_token";

export type AdminStatus = "ACTIVE" | "PENDING" | "SUSPENDED";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AdminProfile = {
  id: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "USER";
  status: AdminStatus;
  joinedAt: string;
  lastLoginAt?: string | null;
};

export type DashboardStats = {
  totalUsers: number;
  totalJobs: number;
  totalSubmissions: number;
  pendingSubmissions: number;
};

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  status: AdminStatus;
  joinedAt: string;
  role: "ADMIN" | "USER";
  emailVerifiedAt?: string | null;
  emailVerificationRequestedAt?: string | null;
};

export type AdminSubmission = {
  id: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string | null;
  notes?: string | null;
  adminComment?: string | null;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string | null;
  };
  documents: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    mimeType?: string | null;
    fileSize?: number | null;
  }>;
};

export type PagedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
};

const getAdminToken = (): string | null => localStorage.getItem(ADMIN_TOKEN_KEY);

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = parts[1]
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");

  try {
    const decoded = atob(payload);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const setAdminToken = (token: string) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

const adminFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const token = getAdminToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Request failed";
    try {
      const payload = (await response.json()) as ApiError;
      errorMessage = payload.message ?? errorMessage;
    } catch {
      // Ignore JSON parse failure
    }
    throw new ApiRequestError(errorMessage, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};

export const adminLogin = async (email: string, password: string) => {
  const result = await adminFetch<{ data: { token: string; admin: AdminProfile } }>(
    "/admin/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
  );

  setAdminToken(result.data.token);
  return result.data.admin;
};

export const getAdminProfile = async () => {
  const result = await adminFetch<{ data: AdminProfile }>("/admin/me");
  return result.data;
};

export const getDashboardStats = async () => {
  const result = await adminFetch<{ data: DashboardStats }>(
    "/admin/dashboard/stats",
  );
  return result.data;
};

export const listAdminUsers = async (params: {
  page: number;
  pageSize: number;
  status?: AdminStatus;
  search?: string;
  sort?: "latest" | "oldest";
}) => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("pageSize", String(params.pageSize));
  if (params.status) searchParams.set("status", params.status);
  if (params.search) searchParams.set("search", params.search);
  if (params.sort) searchParams.set("sort", params.sort);

  return adminFetch<PagedResponse<AdminUser>>(`/admin/users?${searchParams.toString()}`);
};

export const updateAdminUserStatus = async (userId: string, status: AdminStatus) =>
  adminFetch<{ data: AdminUser }>(`/admin/users/${userId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const verifyAdminUserEmail = async (userId: string) =>
  adminFetch<{ data: AdminUser }>(`/admin/users/${userId}/verify-email`, {
    method: "PATCH",
  });

export const deleteAdminUser = async (userId: string) =>
  adminFetch<void>(`/admin/users/${userId}`, {
    method: "DELETE",
  });

export const listAdminSubmissions = async (params: {
  page: number;
  pageSize: number;
  status?: VerificationStatus;
  search?: string;
  sort?: "latest" | "oldest";
}) => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("pageSize", String(params.pageSize));
  if (params.status) searchParams.set("status", params.status);
  if (params.search) searchParams.set("search", params.search);
  if (params.sort) searchParams.set("sort", params.sort);

  return adminFetch<PagedResponse<AdminSubmission>>(
    `/admin/submissions?${searchParams.toString()}`,
  );
};

export const updateAdminSubmissionStatus = async (
  submissionId: string,
  payload: {
    status: VerificationStatus;
    adminComment?: string;
    notes?: string;
  },
) =>
  adminFetch<{ data: AdminSubmission }>(
    `/admin/submissions/${submissionId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );

export const getSubmissionCount = async (status?: VerificationStatus) => {
  const result = await listAdminSubmissions({
    page: 1,
    pageSize: 1,
    status,
  });
  return result.meta.total;
};

export const getStoredAdminToken = () => getAdminToken();

export const getAdminTokenExpiryMs = (): number | null => {
  const token = getAdminToken();
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  const exp = typeof payload?.exp === "number" ? payload.exp : null;
  return exp ? exp * 1000 : null;
};

export const getAdminTokenRemainingMs = (): number | null => {
  const expiryMs = getAdminTokenExpiryMs();
  if (!expiryMs) return null;
  return Math.max(expiryMs - Date.now(), 0);
};
