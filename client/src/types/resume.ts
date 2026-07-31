export interface Resume {
  id: number;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  status: "UPLOADED" | "READY" | "FAILED";
}

export interface ResumeAnalysis {
  overallScore: number;
  structuralScore: number;
  contentScore: number;

  sectionScores: {
    summary: number;
    experience: number;
    projects: number;
    skills: number;
    clarity: number;
    impact: number;
  };

  strengths: string[];
  issues: string[];
  suggestions: string[];
  missingSections: string[];
}