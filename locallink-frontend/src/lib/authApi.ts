import axios from "axios";
import { apiClient } from "./apiClient";

const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "userId";
const AUTH_PROFILE_KEY = "auth_user_profile";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  role: string;
  status: string;
  avatarUrl?: string | null;
  location?: string | null;
  bio?: string | null;
  joinedAt: string;
  emailVerifiedAt?: string | null;
  emailVerificationRequestedAt?: string | null;
};

export type AuthResponse = {
  userId: string;
  token: string;
  user: AuthUser;
};

export type AuthPayload = {
  fullName?: string;
  email: string;
  password: string;
};

export const setAuthSession = (data: AuthResponse) => {
  localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  localStorage.setItem(AUTH_USER_KEY, data.userId);
  localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(data.user));
  window.dispatchEvent(new Event("auth:changed"));
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_PROFILE_KEY);
  window.dispatchEvent(new Event("auth:changed"));
};

export const getAuthToken = (): string | null =>
  localStorage.getItem(AUTH_TOKEN_KEY);

export const getAuthUserId = (): string | null =>
  localStorage.getItem(AUTH_USER_KEY);

export const getStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem(AUTH_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

const parseApiError = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      fallback;
    return new Error(message);
  }
  return error instanceof Error ? error : new Error(fallback);
};

export const registerUser = async (payload: AuthPayload) => {
  try {
    const result = await apiClient.post<{ data: AuthResponse }>(
      "/auth/register",
      payload,
    );
    setAuthSession(result.data.data);
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to register. Please try again.");
  }
};

export const loginUser = async (payload: AuthPayload) => {
  try {
    const result = await apiClient.post<{ data: AuthResponse }>(
      "/auth/login",
      payload,
    );
    setAuthSession(result.data.data);
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to log in. Please try again.");
  }
};

export const logoutUser = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // Ignore network errors on logout to ensure session clears.
  } finally {
    clearAuthSession();
  }
};

export const fetchCurrentUser = async () => {
  try {
    const result = await apiClient.get<{ data: AuthUser }>("/auth/me");
    localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(result.data.data));
    window.dispatchEvent(new Event("auth:changed"));
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to load user profile.");
  }
};

export type ProfileUpdatePayload = {
  fullName?: string;
  email?: string;
  phone?: string | null;
  bio?: string | null;
  location?: string | null;
};

export const updateProfile = async (payload: ProfileUpdatePayload) => {
  try {
    const result = await apiClient.patch<{ data: AuthUser }>("/auth/me", payload);
    localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(result.data.data));
    window.dispatchEvent(new Event("auth:changed"));
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to update profile.");
  }
};

export const updatePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    await apiClient.patch("/auth/me/password", payload);
  } catch (error) {
    throw parseApiError(error, "Unable to update password.");
  }
};

export const fetchSkills = async (): Promise<string[]> => {
  try {
    const result = await apiClient.get<{ data: string[] }>("/auth/me/skills");
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to load skills.");
  }
};

export const addSkill = async (name: string): Promise<string[]> => {
  try {
    const result = await apiClient.post<{ data: string[] }>("/auth/me/skills", {
      name,
    });
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to add skill.");
  }
};

export const requestEmailVerification = async (): Promise<AuthUser> => {
  try {
    const result = await apiClient.post<{ data: AuthUser }>(
      "/auth/me/request-email-verification",
    );
    localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(result.data.data));
    window.dispatchEvent(new Event("auth:changed"));
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to request email verification.");
  }
};

export const removeSkill = async (name: string): Promise<string[]> => {
  try {
    const result = await apiClient.delete<{ data: string[] }>(
      `/auth/me/skills/${encodeURIComponent(name)}`,
    );
    return result.data.data;
  } catch (error) {
    throw parseApiError(error, "Unable to remove skill.");
  }
};
