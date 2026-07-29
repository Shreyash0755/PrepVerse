import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, Plus, Search, X } from "lucide-react";
import { SKILLS } from "@/data/skills";
import { cn } from "@/utils/cn";

interface SkillChipsProps {
  skills: string[];
  editable?: boolean;
  onChange?: (skills: string[]) => void;
}

const MAX_SUGGESTIONS = 8;

export function SkillChips({
  skills,
  editable = false,
  onChange,
}: SkillChipsProps) {
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normalisedSkills = useMemo(
    () => new Set(skills.map((skill) => skill.toLowerCase())),
    [skills]
  );

  const suggestions = useMemo(() => {
    const query = draft.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return SKILLS
      .filter((skill) => {
        const normalisedSkill = skill.toLowerCase();

        return (
          normalisedSkill.includes(query) &&
          !normalisedSkills.has(normalisedSkill)
        );
      })
      .sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();

        const aStarts = aLower.startsWith(query);
        const bStarts = bLower.startsWith(query);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return a.localeCompare(b);
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [draft, normalisedSkills]);

  const exactMatch = useMemo(() => {
    const query = draft.trim().toLowerCase();

    if (!query) return false;

    return SKILLS.some(
      (skill) => skill.toLowerCase() === query
    );
  }, [draft]);

  const alreadySelected = useMemo(() => {
    const query = draft.trim().toLowerCase();

    return query ? normalisedSkills.has(query) : false;
  }, [draft, normalisedSkills]);

  const canAddCustom =
    draft.trim().length > 0 &&
    !exactMatch &&
    !alreadySelected;

  const optionCount =
    suggestions.length + (canAddCustom ? 1 : 0);

  function addSkill(skill: string) {
    const value = skill.trim();

    if (!value) return;

    const exists = skills.some(
      (existing) =>
        existing.toLowerCase() === value.toLowerCase()
    );

    if (exists) {
      setDraft("");
      setIsOpen(false);
      return;
    }

    onChange?.([...skills, value]);

    setDraft("");
    setIsOpen(false);
    setActiveIndex(0);
  }

  function removeSkill(skill: string) {
    onChange?.(
      skills.filter(
        (existing) =>
          existing.toLowerCase() !== skill.toLowerCase()
      )
    );
  }

  function selectActiveOption() {
    if (optionCount === 0) {
      if (draft.trim()) {
        addSkill(draft);
      }
      return;
    }

    if (activeIndex < suggestions.length) {
      addSkill(suggestions[activeIndex]);
      return;
    }

    if (canAddCustom) {
      addSkill(draft);
    }
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "ArrowDown") {
      if (optionCount === 0) return;

      e.preventDefault();
      setIsOpen(true);

      setActiveIndex((current) =>
        current >= optionCount - 1
          ? 0
          : current + 1
      );

      return;
    }

    if (e.key === "ArrowUp") {
      if (optionCount === 0) return;

      e.preventDefault();
      setIsOpen(true);

      setActiveIndex((current) =>
        current <= 0
          ? optionCount - 1
          : current - 1
      );

      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      selectActiveOption();
      return;
    }

    if (e.key === ",") {
      e.preventDefault();

      if (draft.trim()) {
        addSkill(draft);
      }

      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(0);
      return;
    }

    if (
      e.key === "Backspace" &&
      !draft &&
      skills.length > 0
    ) {
      onChange?.(skills.slice(0, -1));
    }
  }

  function handleBlur() {
    blurTimeout.current = setTimeout(() => {
      setIsOpen(false);
      setActiveIndex(0);
    }, 150);
  }

  function handleFocus() {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
    }

    if (draft.trim()) {
      setIsOpen(true);
    }
  }

  if (skills.length === 0 && !editable) {
    return (
      <p className="text-sm text-ink-faint">
        No skills added yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {editable && (
        <label
          htmlFor="skills-input"
          className="block text-sm font-medium text-ink"
        >
          Skills
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={cn(
              "inline-flex items-center gap-1.5",
              "rounded-sm border border-border-strong",
              "bg-surface-raised px-2.5 py-1",
              "font-mono text-xs text-ink"
            )}
          >
            {skill}

            {editable && (
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                aria-label={`Remove ${skill}`}
                className={cn(
                  "rounded-sm text-ink-faint",
                  "transition-colors",
                  "hover:text-danger",
                  "focus:outline-none",
                  "focus:ring-1 focus:ring-accent"
                )}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
      </div>

      {editable && (
        <div className="relative">
          <div
            className={cn(
              "flex items-center gap-2",
              "rounded-sm border border-border-strong",
              "bg-surface px-3",
              "transition-colors",
              "focus-within:border-accent"
            )}
          >
            <Search className="h-4 w-4 shrink-0 text-ink-faint" />

            <input
              id="skills-input"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setIsOpen(Boolean(e.target.value.trim()));
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search skills..."
              autoComplete="off"
              role="combobox"
              aria-expanded={isOpen}
              aria-controls="skill-suggestions"
              className={cn(
                "min-w-0 flex-1 bg-transparent",
                "py-2.5 font-mono text-sm text-ink",
                "placeholder:text-ink-faint",
                "focus:outline-none"
              )}
            />
          </div>

          {isOpen && draft.trim() && (
            <div
              id="skill-suggestions"
              role="listbox"
              className={cn(
                "absolute z-50 mt-1 w-full overflow-hidden",
                "rounded-sm border border-border-strong",
                "bg-surface shadow-lg"
              )}
            >
              {suggestions.map((skill, index) => (
                <button
                  key={skill}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addSkill(skill)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "flex w-full items-center justify-between",
                    "px-3 py-2.5 text-left",
                    "font-mono text-sm text-ink",
                    "transition-colors",
                    activeIndex === index
                      ? "bg-accent-soft text-accent"
                      : "hover:bg-surface-raised"
                  )}
                >
                  <span>{skill}</span>

                  {activeIndex === index && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}

              {canAddCustom && (
                <button
                  type="button"
                  role="option"
                  aria-selected={
                    activeIndex === suggestions.length
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addSkill(draft)}
                  onMouseEnter={() =>
                    setActiveIndex(suggestions.length)
                  }
                  className={cn(
                    "flex w-full items-center gap-2",
                    "border-t border-border",
                    "px-3 py-2.5 text-left",
                    "font-mono text-sm",
                    "transition-colors",
                    activeIndex === suggestions.length
                      ? "bg-accent-soft text-accent"
                      : "text-ink-muted hover:bg-surface-raised"
                  )}
                >
                  <Plus className="h-4 w-4" />

                  <span>
                    Add{" "}
                    <span className="text-ink">
                      "{draft.trim()}"
                    </span>
                  </span>
                </button>
              )}

              {suggestions.length === 0 &&
                !canAddCustom && (
                  <div className="px-3 py-3 font-mono text-xs text-ink-faint">
                    Skill already added.
                  </div>
                )}
            </div>
          )}

          <p className="mt-1.5 font-mono text-[11px] text-ink-faint">
            Search and select skills, or enter your own.
          </p>
        </div>
      )}
    </div>
  );
}