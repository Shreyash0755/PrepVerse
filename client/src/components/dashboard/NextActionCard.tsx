import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function NextActionItem({
  hash,
  icon: Icon,
  title,
  description,
  to,
}: {
  hash: string;
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-md border border-transparent px-3 py-3 transition-colors hover:border-border-strong hover:bg-surface-raised"
    >
      <span className="hidden shrink-0 font-mono text-xs text-ink-faint sm:block">
        {hash}
      </span>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-raised">
        <Icon className="h-4 w-4 text-accent-bright" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{title}</p>
        <p className="truncate text-xs text-ink-muted">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent-bright" />
    </Link>
  );
}
