import { api } from "./axios";
import type { Profile, ProfileUpdatePayload } from "@/types/profile";

export const profileApi = {
  get() {
    return api.get<Profile>("/profile");
  },
  update(payload: ProfileUpdatePayload) {
    return api.put<Profile>("/profile", payload);
  },
};
