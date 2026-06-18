import type { AxiosError } from "axios";

type ErrorShape = {
  message: string;
  status?: number;
  code?: string;
  data?: unknown;
  url?: string;
  method?: string;
  source: "axios" | "fetch";
};

function toUserMessage(
  input: unknown,
  fallback = "An unexpected error occurred.",
): string {
  if (!input) return fallback;
  if (typeof input === "string") return input;
  if (typeof input === "object" && input !== null) {
    const obj = input as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if (obj.error && typeof obj.error === "object" && obj.error !== null) {
      const errorObj = obj.error as Record<string, unknown>;
      if (typeof errorObj.message === "string") return errorObj.message;
      if (typeof errorObj === "string") return errorObj;
    }
    if (typeof obj.error === "string") return obj.error;
    if (typeof obj.title === "string") return obj.title;
    if (typeof obj.detail === "string") return obj.detail;
  }
  return fallback;
}

export function handleApiError(err: unknown): ErrorShape {
  let status: number | undefined;
  let data: unknown;
  let method: string | undefined;
  let url: string | undefined;
  let code: string | undefined;
  let msg: string;

  if (isAxiosError(err)) {
    status = err.response?.status;
    data = err.response?.data;
    method = err.config?.method?.toUpperCase?.();
    url = err.config?.url;
    code = err.code;
    msg =
      toUserMessage(data) ||
      err.response?.statusText ||
      (code === "ECONNABORTED"
        ? "Request timed out. Please try again."
        : err.message || "Request failed.");
  } else if (typeof err === "object" && err !== null && "message" in err) {
    msg = toUserMessage((err as { message?: string }).message);
  } else {
    msg = "Request failed.";
  }

  return {
    message: msg,
    status,
    code,
    data,
    url,
    method,
    source: "axios",
  };
}

function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as { isAxiosError?: boolean }).isAxiosError === true
  );
}
