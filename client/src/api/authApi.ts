import { api } from "./axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";

export const authApi = {
  register(payload: RegisterPayload) {
    return api.post<RegisterResponse>("/auth/register", payload);
  },
  login(payload: LoginPayload) {
    return api.post<LoginResponse>("/auth/login", payload);
  },
};
