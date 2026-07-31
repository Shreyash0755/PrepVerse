import { api } from "./axios";
import type { Resume, ResumeAnalysis } from "@/types/resume";

export const resumeApi = {
  get() {
    return api.get<Resume>("/resume");
  },

  upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return api.post<Resume>("/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getFullAnalysis() {
    return api.get<ResumeAnalysis>("/resume/full-analysis");
  },
};