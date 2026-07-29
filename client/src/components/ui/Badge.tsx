import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Tone = "neutral" | "accent" | "warn" | "danger";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-raised text-ink-muted border-border-strong",
  accent: "bg-accent-soft text-accent-bright border-accent/30",
  warn: "bg-warn/10 text-warn border-warn/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
