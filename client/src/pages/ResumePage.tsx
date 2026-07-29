import { FileText, Sparkles, ListChecks, UploadCloud } from "lucide-react";
import { ModulePreviewPage } from "@/components/dashboard/ModulePreviewPage";

export function ResumePage() {
  return (
    <ModulePreviewPage
      icon={FileText}
      eyebrow="resume"
      title="Resume"
      description="Upload your resume and get AI-assisted feedback tied to your actual profile and target roles."
      points={[
        {
          icon: UploadCloud,
          title: "Upload your resume",
          body: "PDF or DOCX — stored against your PrepVerse profile.",
        },
        {
          icon: Sparkles,
          title: "AI analysis",
          body: "Feedback on structure, clarity, and impact — grounded in what you actually wrote.",
        },
        {
          icon: ListChecks,
          title: "Resume score",
          body: "A transparent score you can track improvement against over time.",
        },
        {
          icon: FileText,
          title: "Improvement suggestions",
          body: "Concrete rewrites for weak bullet points, not generic tips.",
        },
      ]}
    />
  );
}
