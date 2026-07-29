import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";

export function NotFoundPage() {
  return (
    <div className="grid-field flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-5 text-center">
      <Logo />
      <div className="space-y-2">
        <p className="font-mono text-sm text-accent-bright">error: 404</p>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Route not found
        </h1>
        <p className="text-sm text-ink-muted">
          <span className="font-mono">GET</span> this page doesn't exist —
          double-check the URL.
        </p>
      </div>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
