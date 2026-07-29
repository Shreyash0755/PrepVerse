import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

export function Logo({
  className,
  to = "/",
}: {
  className?: string;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink",
        className
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-[13px] font-bold text-accent-ink">
        P
      </span>
      <span>
        Prep<span className="text-accent-bright">Verse</span>
        <span className="text-accent-bright group-hover:animate-blink">_</span>
      </span>
    </Link>
  );
}
