import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

type Status = "not-started" | "in-progress" | "complete" | "coming-soon";

const STATUS_LABEL: Record<Status, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  complete: "Complete",
  "coming-soon": "Coming soon",
};

const STATUS_TONE: Record<Status, "neutral" | "accent" | "warn"> = {
  "not-started": "neutral",
  "in-progress": "warn",
  complete: "accent",
  "coming-soon": "neutral",
};

export function StatusCard({
  icon: Icon,
  title,
  description,
  status,
  to,
  ctaLabel,
  footer,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  status: Status;
  to: string;
  ctaLabel: string;
  footer?: ReactNode;
}) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-raised">
            <Icon className="h-4 w-4 text-accent-bright" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{title}</p>
          </div>
        </div>
        <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
      </div>
      <p className="text-sm text-ink-muted">{description}</p>
      {footer}
      <Link
        to={to}
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright hover:underline"
        )}
      >
        {ctaLabel} →
      </Link>
    </Card>
  );
}
