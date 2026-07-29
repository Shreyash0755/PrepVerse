import { isAxiosError } from "axios";
import type { ApiErrorPayload, FieldErrors } from "@/types/auth";

export function parseApiError(error: unknown): {
  message: string;
  fieldErrors: FieldErrors;
} {
  if (isAxiosError<ApiErrorPayload>(error) && error.response) {
    const data = error.response.data ?? {};
    const { message, ...rest } = data;
    const fieldErrors: FieldErrors = {};
    for (const [key, value] of Object.entries(rest)) {
      if (typeof value === "string") fieldErrors[key] = value;
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { message: "Please fix the highlighted fields.", fieldErrors };
    }

    if (message) return { message, fieldErrors };

    if (error.response.status === 409) {
      return { message: "That email is already registered.", fieldErrors };
    }
    if (error.response.status === 401) {
      return { message: "Invalid email or password.", fieldErrors };
    }
  }

  if (isAxiosError(error) && !error.response) {
    return {
      message: "Can't reach the server. Check your connection and try again.",
      fieldErrors: {},
    };
  }

  return { message: "Something went wrong. Please try again.", fieldErrors: {} };
}
