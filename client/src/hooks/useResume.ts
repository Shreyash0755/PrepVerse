import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { resumeApi } from "@/api/resumeApi";
import type { Resume } from "@/types/resume";
import { parseApiError } from "@/utils/apiError";

export function useResume() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchResume = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await resumeApi.get();
      setResume(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setResume(null);
      } else {
        const { message } = parseApiError(error);
        setLoadError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadResume = useCallback(async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF resumes are allowed.");
      return false;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Resume must be 5 MB or smaller.");
      return false;
    }

    setIsUploading(true);

    try {
      const response = await resumeApi.upload(file);
      setResume(response.data);
      toast.success("Resume uploaded successfully.");
      return true;
    } catch (error) {
      const { message } = parseApiError(error);
      toast.error(message);
      return false;
    } finally {
      setIsUploading(false);
    }
  }, []);

  useEffect(() => {
    void fetchResume();
  }, [fetchResume]);

  return {
    resume,
    isLoading,
    isUploading,
    loadError,
    refetch: fetchResume,
    uploadResume,
  };
}