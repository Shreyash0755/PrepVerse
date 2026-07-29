import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Briefcase,
  MessagesSquare,
  Bot,
  UserRound,
  KeyRound,
  Code2,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const BUILD_LOG = [
  { hash: "a3f9c1", line: "init career_profile", state: "done" as const },
  { hash: "7b2e04", line: "draft resume.md", state: "done" as const },
  { hash: "e91d3a", line: "track applications[]", state: "active" as const },
  { hash: "42c8f7", line: "solve dsa/arrays.ts", state: "pending" as const },
  { hash: "f10b56", line: "run mock_interview()", state: "pending" as const },
];

const WORKFLOW = [
  {
    hash: "0x01",
    icon: UserRound,
    title: "Set up your profile",
    body: "College, skills, CGPA, links — the identity every other module reads from.",
  },
  {
    hash: "0x02",
    icon: FileText,
    title: "Draft your resume",
    body: "Turn your profile into a resume, then let AI review it for gaps.",
  },
  {
    hash: "0x03",
    icon: Briefcase,
    title: "Track applications",
    body: "Every role you apply to, and where it stands, in one list.",
  },
  {
    hash: "0x04",
    icon: MessagesSquare,
    title: "Drill DSA & interview rounds",
    body: "Structured practice for the rounds that actually decide offers.",
  },
  {
    hash: "0x05",
    icon: Bot,
    title: "Run an AI mock interview",
    body: "Rehearse out loud against a model built to interrupt and probe.",
  },
];

const MODULES_LIVE = [
  {
    icon: KeyRound,
    title: "Authentication",
    body: "Secure sign-up and sign-in with JWT-backed sessions.",
  },
  {
    icon: UserRound,
    title: "Profile",
    body: "College, degree, CGPA, skills, bio, and links — your prep identity.",
  },
];

const MODULES_UPCOMING = [
  {
    icon: FileText,
    title: "Resume",
    body: "Upload a resume, get an AI-scored breakdown and targeted fixes.",
  },
  {
    icon: Briefcase,
    title: "Jobs",
    body: "Discover openings matched to your skills and track every application.",
  },
  {
    icon: MessagesSquare,
    title: "Interview prep",
    body: "Structured question banks by role, company pattern, and topic.",
  },
  {
    icon: Bot,
    title: "AI mock interview",
    body: "A live, adaptive interviewer that responds to what you actually say.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <Workflow />
      <Modules />
      <AiPreview />
      <FinalCta />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="grid-field pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr,1fr] lg:items-center lg:py-28">
        <div className="space-y-7">
          <Badge tone="accent">placement_prep / v1</Badge>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Build your career like you build software.
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
            Resume, jobs, DSA, and interviews — tracked, versioned, and
            shipped from one command center built for engineering and CS
            students, not recruiters.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/register">
              <Button size="lg">
                Get started free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Sign in
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2 pt-2 font-mono text-xs text-ink-faint">
            <span className="term-dot bg-accent-bright" />
            no fake scores. no fake companies. what you see is what exists.
          </div>
        </div>

        <BuildLogTerminal />
      </div>
    </section>
  );
}

function BuildLogTerminal() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-lg border border-border-strong bg-surface shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="term-dot bg-danger/70" />
        <span className="term-dot bg-warn/70" />
        <span className="term-dot bg-accent-bright/70" />
        <span className="ml-3 font-mono text-xs text-ink-faint">
          build_log — prepverse
        </span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px]">
        {BUILD_LOG.map((entry) => (
          <div key={entry.hash} className="flex items-start gap-3">
            <span className="text-ink-faint">{entry.hash}</span>
            <span
              className={
                entry.state === "done"
                  ? "text-accent-bright"
                  : entry.state === "active"
                  ? "text-ink"
                  : "text-ink-faint"
              }
            >
              {entry.state === "done" && "✔ "}
              {entry.state === "active" && "→ "}
              {entry.state === "pending" && "· "}
              {entry.line}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1 pt-1 text-ink-muted">
          <span className="text-accent-bright">$</span>
          <span className="caret" />
        </div>
      </div>
    </div>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 max-w-xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-bright">
            how it works
          </span>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            One preparation pipeline, five commits.
          </h2>
          <p className="text-ink-muted">
            Each stage feeds the next — your profile informs your resume,
            your resume informs how you're matched, and practice informs how
            ready you actually are.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[19px] top-2 bottom-2 hidden w-px bg-border-strong sm:block"
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {WORKFLOW.map((step) => (
              <li key={step.hash} className="relative flex gap-5 sm:gap-6">
                <div className="relative z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-strong bg-surface sm:flex">
                  <step.icon className="h-4 w-4 text-accent-bright" />
                </div>
                <div className="flex-1 border-l border-border pl-5 sm:border-none sm:pl-0">
                  <div className="mb-1 flex items-center gap-2 font-mono text-xs text-ink-faint">
                    {step.hash}
                  </div>
                  <h3 className="text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-lg text-sm text-ink-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="features" className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 max-w-xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-bright">
            modules
          </span>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Some modules ship today. The rest are in the pipeline.
          </h2>
          <p className="text-ink-muted">
            We'd rather tell you what's real than dress up a roadmap as a
            finished product.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-ink-faint">
          <span className="term-dot bg-accent-bright" /> live now
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODULES_LIVE.map((m) => (
            <div
              key={m.title}
              className="flex gap-4 rounded-lg border border-accent/25 bg-accent-soft p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface">
                <m.icon className="h-4 w-4 text-accent-bright" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">{m.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{m.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 mt-12 flex items-center gap-2 font-mono text-xs text-ink-faint">
          <span className="term-dot bg-ink-faint" /> building next
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES_UPCOMING.map((m) => (
            <div
              key={m.title}
              className="flex flex-col gap-3 rounded-lg border border-dashed border-border-strong p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-raised">
                  <m.icon className="h-4 w-4 text-ink-muted" />
                </div>
                <Badge>Coming soon</Badge>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">{m.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiPreview() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-bright">
            ai preparation
          </span>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            AI that reviews your prep, not a generic chatbot.
          </h2>
          <p className="max-w-md text-ink-muted">
            Resume analysis and AI mock interviews are on the roadmap — built
            to read your actual profile and resume, not a template. Until
            they ship, we'll say so plainly.
          </p>
          <Badge tone="neutral">Coming soon</Badge>
        </div>
        <div className="rounded-lg border border-border-strong bg-surface p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs text-ink-faint">
            <Code2 className="h-3.5 w-3.5" /> resume_review.diff (preview)
          </div>
          <div className="space-y-2 font-mono text-[13px] leading-relaxed">
            <p className="text-ink-faint">
              - "Worked on a project involving web development"
            </p>
            <p className="text-accent-bright">
              + "Built a React + Spring Boot app serving 200+ students"
            </p>
            <p className="text-ink-faint">
              - skills: "some Java, a bit of SQL"
            </p>
            <p className="text-accent-bright">
              + skills: "Java, Spring Boot, PostgreSQL"
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-md border border-border bg-surface-raised px-3 py-2 text-xs text-ink-faint">
            <Sparkles className="h-3.5 w-3.5" />
            Illustrative preview — not a live analysis.
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-lg space-y-2">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Your placement prep deserves version control.
          </h2>
          <p className="text-ink-muted">
            Create your profile in under two minutes. No fees, no fluff.
          </p>
        </div>
        <Link to="/register">
          <Button size="lg">
            Create your account <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
