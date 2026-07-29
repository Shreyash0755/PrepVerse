import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-sm text-sm text-ink-muted">
            Built for students preparing for engineering and CS placements —
            one command center for resumes, jobs, DSA, and interviews.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-ink-faint">
          <span className="term-dot bg-accent-bright/70" />
          <span>status: actively building_</span>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-ink-faint sm:px-8">
        © {new Date().getFullYear()} PrepVerse. Built by students, for
        students.
      </div>
    </footer>
  );
}
