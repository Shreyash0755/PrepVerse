import { CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import type { Profile } from "@/types/profile";
import { calculateProfileCompletion } from "@/utils/profileCompletion";

const FIELD_LABELS: Array<{ key: keyof Profile; label: string }> = [
  { key: "college", label: "College" },
  { key: "degree", label: "Degree" },
  { key: "cgpa", label: "CGPA" },
  { key: "skills", label: "Skills" },
  { key: "bio", label: "Bio" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
];

export function ProfileCompletion({ profile }: { profile: Profile | null }) {
  const { percent, completedCount, totalCount } =
    calculateProfileCompletion(profile);

  return (
    <div className="space-y-4">
      <Progress
        value={percent}
        label={`Profile completeness — ${completedCount}/${totalCount} sections`}
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
        {FIELD_LABELS.map(({ key, label }) => {
          const value = profile?.[key];
          const done =
            value !== null && value !== undefined && `${value}`.trim() !== "";
          return (
            <li
              key={key}
              className="flex items-center gap-1.5 text-xs text-ink-muted"
            >
              {done ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-bright" />
              ) : (
                <Circle className="h-3.5 w-3.5 text-ink-faint" />
              )}
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
