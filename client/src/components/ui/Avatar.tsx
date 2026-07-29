import { cn } from "@/utils/cn";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft font-mono text-xs font-semibold text-accent-bright",
        className
      )}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
