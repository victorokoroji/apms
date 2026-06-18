import { toast } from "react-toastify";

type ValidErrorResponse = {
  success: boolean;
  message: string;
  errorCode?: string;
  errors?: Record<string, string[]>;
  traceId?: string;
  timestamp?: string;
};

function extractErrorMessages(error: ValidErrorResponse): string[] {
  if (!error) return ["An unknown error occurred."];

  if (error.errors && typeof error.errors === "object") {
    return Object.entries(error.errors).flatMap(([field, messages]) =>
      messages.map((msg) => `${field}: ${msg}`),
    );
  }

  return [error.message || "An error occurred."];
}

export const errorHandler = (err: unknown) => {
  if (
    typeof err === "object" &&
    err !== null &&
    "data" in err &&
    typeof (err as { data: unknown }).data === "object" &&
    (err as { data: unknown }).data !== null
  ) {
    const data = (err as { data: unknown }).data as ValidErrorResponse;
    const messages = extractErrorMessages(data);
    messages.forEach((msg) => {
      toast.error(msg);
    });
  } else if (
    typeof err === "object" &&
    err !== null &&
    "data" in err &&
    typeof (err as { data: unknown }).data === "object" &&
    (err as { data: { data?: { value?: { message?: string } } } }).data?.data
      ?.value?.message
  ) {
    const message = (err as { data: { data: { value: { message: string } } } })
      .data.data.value.message;
    toast.error(message);
  } else if (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
  ) {
    toast.error((err as { message: string }).message);
  } else {
    toast.error("Something unexpected happened");
  }
};
