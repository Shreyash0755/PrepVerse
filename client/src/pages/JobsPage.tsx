import { Briefcase, Target, ClipboardList, BellRing } from "lucide-react";
import { ModulePreviewPage } from "@/components/dashboard/ModulePreviewPage";

export function JobsPage() {
  return (
    <ModulePreviewPage
      icon={Briefcase}
      eyebrow="jobs"
      title="Jobs"
      description="Discover openings matched to your skills and keep every application organized in one place."
      points={[
        {
          icon: Target,
          title: "Matched openings",
          body: "Roles surfaced based on the skills and degree in your profile.",
        },
        {
          icon: ClipboardList,
          title: "Application tracking",
          body: "Applied, in review, interviewing, offer — one board for all of it.",
        },
        {
          icon: BellRing,
          title: "Deadline reminders",
          body: "Never miss a closing date for a role you're serious about.",
        },
        {
          icon: Briefcase,
          title: "Company insights",
          body: "Context on the companies you're applying to, in one place.",
        },
      ]}
    />
  );
}
