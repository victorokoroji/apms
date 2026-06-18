import type { AxiosError, AxiosInstance } from "axios";
import { handleApiError } from "./handleApiError";

export function attachInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(
    (config) => {
      // Check online status before making request
      if (typeof window !== "undefined" && !navigator.onLine) {
        // Store current page before redirecting
        sessionStorage.setItem("redirectFrom", window.location.pathname);
        // Redirect to no-internet page
        window.location.href = "/no-internet";
        return Promise.reject(new Error("No internet connection"));
      }

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Check if error is due to network issues
      if (
        typeof window !== "undefined" &&
        (!navigator.onLine ||
          error.code === "ERR_NETWORK" ||
          error.code === "ECONNABORTED")
      ) {
        // Store current page before redirecting
        sessionStorage.setItem("redirectFrom", window.location.pathname);
        // Redirect to no-internet page
        window.location.href = "/no-internet";
        return Promise.reject({
          message: "No internet connection",
          status: 0,
          code: "NETWORK_ERROR",
        });
      }

      const normalized = handleApiError(error);
      return Promise.reject(normalized);
    },
  );
}
