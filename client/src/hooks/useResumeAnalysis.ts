import { useCallback, useState } from "react";
import { resumeApi } from "@/api/resumeApi";
import type { ResumeAnalysis } from "@/types/resume";
import { parseApiError } from "@/utils/apiError";

export function useResumeAnalysis() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const analyze = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await resumeApi.getFullAnalysis();
      setAnalysis(response.data);
      return response.data;
    } catch (error) {
      const { message } = parseApiError(error);
      setAnalysisError(message);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setAnalysisError(null);
  }, []);

  return {
    analysis,
    isAnalyzing,
    analysisError,
    analyze,
    clearAnalysis,
  };
}