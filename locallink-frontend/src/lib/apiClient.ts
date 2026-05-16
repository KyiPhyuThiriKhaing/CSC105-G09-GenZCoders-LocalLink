import axios from "axios";

const AUTH_SUSPENDED_KEY = "auth_suspended_message";

// Create a configured Axios instance
export const apiClient = axios.create({
  // Point this to your backend's URL. Once deployed, you'll change this to your production URL using .env vars.
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to automatically attach the Auth token if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      (error?.response?.data as { message?: string } | undefined)?.message ?? "";
    const requestUrl = typeof error?.config?.url === "string" ? error.config.url : "";
    const isAuthEndpoint = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

    if (status === 403 && message.toLowerCase().includes("suspended")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("auth_user_profile");
      localStorage.setItem(AUTH_SUSPENDED_KEY, message || "Account suspended");
      window.dispatchEvent(new Event("auth:changed"));
      window.location.href = "/suspended";
    }

    if (status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("auth_user_profile");
      window.dispatchEvent(new Event("auth:changed"));
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
