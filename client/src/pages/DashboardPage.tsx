import { FileText, Briefcase, MessagesSquare, Bot, UserRound } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { NextActionItem } from "@/components/dashboard/NextActionCard";
import { ProfileCompletion } from "@/components/profile/ProfileCompletion";
import { useProfile } from "@/hooks/useProfile";
import { calculateProfileCompletion } from "@/utils/profileCompletion";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const { profile, isLoading, hasNoProfile, loadError, refetch } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (loadError) {
    return (
      <Card className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-sm text-ink-muted">{loadError}</p>
        <Button variant="secondary" onClick={refetch}>
          Try again
        </Button>
      </Card>
    );
  }

  const { percent } = calculateProfileCompletion(profile);
  const displayName = profile?.name?.split(" ")[0];

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-accent-bright">
          dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {displayName ? `Welcome back, ${displayName}.` : "Welcome back."}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Here's what's ready, and what to work on next.
        </p>
      </div>

      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Profile status</h2>
          {hasNoProfile && <Badge tone="warn">Setup required</Badge>}
        </div>

        {hasNoProfile ? (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ink-muted">
              You haven't set up your profile yet. It's what powers your
              resume, matching, and readiness across PrepVerse.
            </p>
            <Link to="/profile">
              <Button>Complete your profile</Button>
            </Link>
          </div>
        ) : (
          <ProfileCompletion profile={profile} />
        )}
      </Card>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-ink">Next up</h2>
        <Card className="divide-y divide-border p-2">
          {hasNoProfile || percent < 100 ? (
            <NextActionItem
              hash="a3f9c1"
              icon={UserRound}
              title="Finish setting up your profile"
              description="College, skills, and links — this unlocks the rest of PrepVerse."
              to="/profile"
            />
          ) : null}
          <NextActionItem
            hash="7b2e04"
            icon={FileText}
            title="Draft your resume"
            description="Coming soon — AI-assisted resume drafting and scoring."
            to="/resume"
          />
          <NextActionItem
            hash="e91d3a"
            icon={Briefcase}
            title="Browse and track jobs"
            description="Coming soon — matched openings and application tracking."
            to="/jobs"
          />
          <NextActionItem
            hash="42c8f7"
            icon={MessagesSquare}
            title="Practice DSA and interview rounds"
            description="Coming soon — structured question banks by topic."
            to="/interview"
          />
        </Card>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-ink">
          Preparation modules
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatusCard
            icon={FileText}
            title="Resume"
            description="Upload and get AI-assisted feedback on your resume."
            status="coming-soon"
            to="/resume"
            ctaLabel="Preview module"
          />
          <StatusCard
            icon={Briefcase}
            title="Jobs"
            description="Discover openings and track every application."
            status="coming-soon"
            to="/jobs"
            ctaLabel="Preview module"
          />
          <StatusCard
            icon={Bot}
            title="AI mock interview"
            description="Rehearse technical and HR rounds with an adaptive AI."
            status="coming-soon"
            to="/mock-interview"
            ctaLabel="Preview module"
          />
        </div>
      </div>
    </div>
  );
}
