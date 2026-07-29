export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
}

/** Field-level validation errors as returned by the backend, e.g. { email: "Invalid email format" } */
export type FieldErrors = Record<string, string>;

export interface ApiErrorPayload {
  message?: string;
  [field: string]: string | undefined;
}
