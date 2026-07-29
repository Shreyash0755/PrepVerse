import { Bot, Mic, FileBarChart, Repeat } from "lucide-react";
import { ModulePreviewPage } from "@/components/dashboard/ModulePreviewPage";

export function MockInterviewPage() {
  return (
    <ModulePreviewPage
      icon={Bot}
      eyebrow="ai mock interview"
      title="AI mock interview"
      description="Rehearse technical and HR rounds against an adaptive AI interviewer that responds to what you actually say."
      points={[
        {
          icon: Mic,
          title: "Live spoken rounds",
          body: "Answer out loud, the way a real interview actually feels.",
        },
        {
          icon: Bot,
          title: "Adaptive follow-ups",
          body: "The interviewer probes weak answers instead of moving on politely.",
        },
        {
          icon: FileBarChart,
          title: "Performance feedback",
          body: "A breakdown of clarity, correctness, and communication after each round.",
        },
        {
          icon: Repeat,
          title: "Repeatable practice",
          body: "Run the same round again to measure real improvement.",
        },
      ]}
    />
  );
}
