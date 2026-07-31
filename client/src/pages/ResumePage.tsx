import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Lightbulb,
  RefreshCw,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useResume } from "@/hooks/useResume";
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";

const SECTION_LABELS: Record<string, string> = {
  summary: "Summary",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  clarity: "Clarity",
  impact: "Impact",
};

function scoreLabel(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 55) return "Needs work";
  return "Weak";
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;

  return `${(kb / 1024).toFixed(1)} MB`;
}

function ScoreRing({ score }: { score: number }) {
  const normalized = Math.max(0, Math.min(100, score));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg
        viewBox="0 0 128 128"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-border"
        />

        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-accent transition-all duration-700"
        />
      </svg>

      <div className="text-center">
        <div className="font-display text-4xl font-semibold text-ink">
          {normalized}
        </div>
        <div className="mt-0.5 text-xs text-ink-muted">
          out of 100
        </div>
      </div>
    </div>
  );
}

function SectionScore({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const normalized = Math.max(0, Math.min(100, score));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-ink">{label}</span>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-ink-faint sm:inline">
            {scoreLabel(normalized)}
          </span>

          <span className="w-8 text-right font-mono text-xs font-medium text-ink">
            {normalized}
          </span>
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700"
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  );
}

export function ResumePage() {
  const {
    resume,
    isLoading,
    isUploading,
    loadError,
    refetch,
    uploadResume,
  } = useResume();

  const {
    analysis,
    isAnalyzing,
    analysisError,
    analyze,
    clearAnalysis,
  } = useResumeAnalysis();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  async function handleFile(file?: File) {
    if (!file || isUploading) return;

    const success = await uploadResume(file);

    if (!success) return;

    clearAnalysis();

    // Analyze the newly uploaded resume.
    await analyze();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    void handleFile(file);

    // Allows selecting the same file again later.
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    void handleFile(file);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (loadError) {
    return (
      <Card className="flex min-h-[300px] flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-raised">
          <FileText className="h-5 w-5 text-ink-muted" />
        </div>

        <div>
          <h1 className="font-display text-xl font-semibold text-ink">
            Couldn't load your resume
          </h1>

          <p className="mt-2 max-w-md text-sm text-ink-muted">
            {loadError}
          </p>
        </div>

        <Button variant="secondary" onClick={refetch}>
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </Card>
    );
  }

  /*
   * NO RESUME
   */
  if (!resume) {
    return (
      <div className="space-y-8">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
            <FileText className="h-3.5 w-3.5" />
            Resume
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Build a stronger resume
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Upload your resume to get feedback on structure,
            content, clarity, technical depth, and impact.
          </p>
        </div>

        <Card className="p-5 sm:p-7">
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex min-h-[330px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition ${
              isDragging
                ? "border-accent bg-accent-soft"
                : "border-border-strong bg-surface-raised"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft">
              <UploadCloud className="h-5 w-5 text-accent" />
            </div>

            <h2 className="mt-5 font-display text-lg font-semibold text-ink">
              Upload your resume
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-ink-muted">
              Drag and drop your PDF here, or choose a file from
              your computer.
            </p>

            <Button
              className="mt-6"
              onClick={() => fileInputRef.current?.click()}
              isLoading={isUploading}
            >
              <UploadCloud className="h-4 w-4" />
              Choose PDF
            </Button>

            <p className="mt-4 text-xs text-ink-faint">
              PDF only · Maximum 5 MB
            </p>
          </div>
        </Card>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    );
  }

  /*
   * RESUME EXISTS
   */
  return (
    <div className="space-y-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            AI Resume Analysis
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Resume intelligence
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            See where your resume is strong, where it loses impact,
            and what to improve next.
          </p>
        </div>
      </div>

      {/* Current resume */}
      <Card className="p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-raised">
              <FileText className="h-5 w-5 text-accent" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {resume.originalFileName}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
                <span>{formatFileSize(resume.fileSize)}</span>
                <span>·</span>
                <span>{resume.status}</span>
                <span>·</span>
                <span>
                  Uploaded{" "}
                  {new Date(resume.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              isLoading={isUploading}
            >
              <UploadCloud className="h-4 w-4" />
              Replace resume
            </Button>

            {!analysis && (
              <Button
                onClick={() => void analyze()}
                isLoading={isAnalyzing}
                disabled={isUploading}
              >
                <Sparkles className="h-4 w-4" />
                Analyze resume
              </Button>
            )}

            {analysis && (
              <Button
                variant="secondary"
                onClick={() => void analyze()}
                isLoading={isAnalyzing}
                disabled={isUploading}
              >
                <RefreshCw className="h-4 w-4" />
                Analyze again
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Analysis loading */}
      {isAnalyzing && !analysis && (
        <Card className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8">
          <Spinner />

          <div className="text-center">
            <p className="text-sm font-medium text-ink">
              Analyzing your resume
            </p>

            <p className="mt-1 text-xs text-ink-muted">
              Reviewing structure, content, clarity, and impact.
            </p>
          </div>
        </Card>
      )}

      {/* Analysis error */}
      {analysisError && !analysis && !isAnalyzing && (
        <Card className="flex min-h-[260px] flex-col items-center justify-center gap-5 p-8 text-center">
          <AlertTriangle className="h-6 w-6 text-warning" />

          <div>
            <h2 className="text-sm font-semibold text-ink">
              Analysis failed
            </h2>

            <p className="mt-2 max-w-md text-sm text-ink-muted">
              {analysisError}
            </p>
          </div>

          <Button onClick={() => void analyze()}>
            <RefreshCw className="h-4 w-4" />
            Try analysis again
          </Button>
        </Card>
      )}

      {/* Waiting to analyze */}
      {!analysis && !isAnalyzing && !analysisError && (
        <Card className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>

          <h2 className="mt-5 font-display text-lg font-semibold text-ink">
            Ready for analysis
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-ink-muted">
            Your resume is uploaded and ready. Run the analysis to
            evaluate its content, structure, clarity, and impact.
          </p>

          <Button
            className="mt-6"
            onClick={() => void analyze()}
          >
            <Sparkles className="h-4 w-4" />
            Analyze resume
          </Button>
        </Card>
      )}

      {/* Analysis dashboard */}
      {analysis && (
        <>
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-[280px_1fr]">
              <div className="flex flex-col items-center justify-center border-b border-border p-7 lg:border-b-0 lg:border-r">
                <ScoreRing score={analysis.overallScore} />

                <div className="mt-4 text-center">
                  <p className="font-display text-lg font-semibold text-ink">
                    {scoreLabel(analysis.overallScore)}
                  </p>

                  <p className="mt-1 text-xs text-ink-muted">
                    PrepVerse Resume Score
                  </p>
                </div>

                <div className="mt-6 grid w-full grid-cols-2 gap-2">
                  <div className="rounded-md border border-border bg-surface-raised p-3 text-center">
                    <div className="font-mono text-lg font-semibold text-ink">
                      {analysis.contentScore}
                    </div>
                    <div className="mt-0.5 text-[11px] text-ink-muted">
                      Content
                    </div>
                  </div>

                  <div className="rounded-md border border-border bg-surface-raised p-3 text-center">
                    <div className="font-mono text-lg font-semibold text-ink">
                      {analysis.structuralScore}
                    </div>
                    <div className="mt-0.5 text-[11px] text-ink-muted">
                      Structure
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-ink">
                      Section performance
                    </h2>
                    <p className="mt-1 text-xs text-ink-muted">
                      AI evaluation across the areas that shape
                      resume quality.
                    </p>
                  </div>

                  <span className="rounded-full border border-accent/20 bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                    AI analyzed
                  </span>
                </div>

                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {Object.entries(analysis.sectionScores).map(
                    ([section, score]) => (
                      <SectionScore
                        key={section}
                        label={SECTION_LABELS[section] ?? section}
                        score={score}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Strengths + Issues */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-success/10">
                  <CheckCircle2 className="h-4.5 w-4.5 text-success" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-ink">
                    What's working
                  </h2>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    Strong signals already present in your resume.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <div
                    key={`${strength}-${index}`}
                    className="flex gap-3 rounded-md border border-border bg-surface-raised p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />

                    <p className="text-sm leading-6 text-ink-muted">
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-warning/10">
                  <AlertTriangle className="h-4.5 w-4.5 text-warning" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-ink">
                    Needs attention
                  </h2>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    Areas currently holding your resume back.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {analysis.issues.map((issue, index) => (
                  <div
                    key={`${issue}-${index}`}
                    className="flex gap-3 rounded-md border border-border bg-surface-raised p-4"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />

                    <p className="text-sm leading-6 text-ink-muted">
                      {issue}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft">
                <Lightbulb className="h-4.5 w-4.5 text-accent" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-ink">
                  Recommended improvements
                </h2>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Start with these changes to strengthen your next
                  version.
                </p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion}-${index}`}
                  className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[42px_1fr]"
                >
                  <span className="font-mono text-xs font-medium text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6 text-ink-muted">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {analysis.missingSections.length > 0 && (
            <Card className="border-warning/25 p-5 sm:p-6">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />

                <div>
                  <h2 className="text-sm font-semibold text-ink">
                    Missing sections
                  </h2>

                  <p className="mt-2 text-sm text-ink-muted">
                    {analysis.missingSections.join(", ")}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}