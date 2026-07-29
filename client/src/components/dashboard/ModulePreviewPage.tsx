import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export interface PreviewPoint {
  icon: LucideIcon;
  title: string;
  body: string;
}

export function ModulePreviewPage({
  icon: Icon,
  eyebrow,
  title,
  description,
  points,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  points: PreviewPoint[];
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-bright">
            {eyebrow}
          </p>
          <h1 className="mt-1 flex items-center gap-2.5 font-display text-2xl font-semibold text-ink sm:text-3xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-raised">
              <Icon className="h-4 w-4 text-accent-bright" />
            </span>
            {title}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">{description}</p>
        </div>
        <Badge tone="warn" className="mt-1 shrink-0">
          Coming soon
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {points.map((point) => (
          <Card key={point.title} className="flex gap-4 p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-raised">
              <point.icon className="h-4 w-4 text-ink-muted" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">
                {point.title}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{point.body}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-dashed p-6 text-center">
        <p className="font-mono text-xs text-ink-faint">
          <span className="text-accent-bright">$</span> this module isn't
          connected to the backend yet — nothing shown here is live data.
        </p>
      </Card>
    </div>
  );
}
