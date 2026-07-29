import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
