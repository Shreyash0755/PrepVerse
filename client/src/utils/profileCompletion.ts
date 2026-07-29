import type { Profile } from "@/types/profile";

export function skillsToChips(skills: string | null | undefined): string[] {
  if (!skills) return [];
  return skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function chipsToSkills(chips: string[]): string {
  return chips.map((c) => c.trim()).filter(Boolean).join(", ");
}

const TRACKED_FIELDS: Array<keyof Profile> = [
  "college",
  "degree",
  "cgpa",
  "skills",
  "bio",
  "linkedin",
  "github",
];

/**
 * Completion percentage derived entirely from real profile fields already
 * returned by the backend — never a fabricated/backend-sourced score.
 */
export function calculateProfileCompletion(profile: Profile | null): {
  percent: number;
  completedCount: number;
  totalCount: number;
} {
  const totalCount = TRACKED_FIELDS.length;
  if (!profile) return { percent: 0, completedCount: 0, totalCount };

  const completedCount = TRACKED_FIELDS.reduce((count, field) => {
    const value = profile[field];
    if (value === null || value === undefined) return count;
    if (typeof value === "string" && value.trim() === "") return count;
    return count + 1;
  }, 0);

  return {
    percent: Math.round((completedCount / totalCount) * 100),
    completedCount,
    totalCount,
  };
}
