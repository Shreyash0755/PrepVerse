import type { ReactNode } from "react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-surface p-10 lg:flex">
        <div
          className="grid-field pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_70%_60%_at_20%_20%,black,transparent)]"
          aria-hidden="true"
        />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative max-w-sm space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-accent-bright">
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold leading-snug text-ink">
            {title}
          </h2>
          <p className="text-sm text-ink-muted">{subtitle}</p>
        </div>
        <div className="relative font-mono text-xs text-ink-faint">
          <span className="text-accent-bright">$</span> status: session_pending
          <span className="caret" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 pb-16 sm:px-8">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
