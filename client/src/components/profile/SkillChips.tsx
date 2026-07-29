import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

export function SkillChips({
  skills,
  editable = false,
  onChange,
}: {
  skills: string[];
  editable?: boolean;
  onChange?: (skills: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function commitDraft() {
    const value = draft.trim();
    if (value && !skills.includes(value)) {
      onChange?.([...skills, value]);
    }
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && !draft && skills.length > 0) {
      onChange?.(skills.slice(0, -1));
    }
  }

  if (skills.length === 0 && !editable) {
    return <p className="text-sm text-ink-faint">No skills added yet.</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-sm border border-border-strong bg-surface-raised px-2.5 py-1 font-mono text-xs text-ink"
          )}
        >
          {skill}
          {editable && (
            <button
              type="button"
              onClick={() => onChange?.(skills.filter((s) => s !== skill))}
              aria-label={`Remove ${skill}`}
              className="text-ink-faint hover:text-danger"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </span>
      ))}
      {editable && (
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder="Add a skill, press Enter"
          className="min-w-[140px] flex-1 rounded-sm border border-dashed border-border-strong bg-transparent px-2.5 py-1 font-mono text-xs text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
      )}
    </div>
  );
}
