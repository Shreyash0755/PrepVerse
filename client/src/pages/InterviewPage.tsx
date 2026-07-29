import { MessagesSquare, Code2, Building2, TrendingUp } from "lucide-react";
import { ModulePreviewPage } from "@/components/dashboard/ModulePreviewPage";

export function InterviewPage() {
  return (
    <ModulePreviewPage
      icon={MessagesSquare}
      eyebrow="interview prep"
      title="Interview prep"
      description="Structured practice for DSA, CS fundamentals, and company-specific interview rounds."
      points={[
        {
          icon: Code2,
          title: "DSA question banks",
          body: "Organized by topic and difficulty — arrays to graphs to dynamic programming.",
        },
        {
          icon: Building2,
          title: "Company-pattern rounds",
          body: "Practice sets modeled on how specific companies actually interview.",
        },
        {
          icon: TrendingUp,
          title: "Progress tracking",
          body: "See which topics you've drilled and which still need work.",
        },
        {
          icon: MessagesSquare,
          title: "HR & behavioral prep",
          body: "Common behavioral questions with guidance on structuring strong answers.",
        },
      ]}
    />
  );
}
