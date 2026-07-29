import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Github, Linkedin, Mail, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Avatar } from "@/components/ui/Avatar";
import { ProfileCompletion } from "@/components/profile/ProfileCompletion";
import { SkillChips } from "@/components/profile/SkillChips";
import { useProfile } from "@/hooks/useProfile";
import { profileApi } from "@/api/profileApi";
import { chipsToSkills, skillsToChips } from "@/utils/profileCompletion";
import { parseApiError } from "@/utils/apiError";

interface FormState {
  college: string;
  degree: string;
  cgpa: string;
  bio: string;
  linkedin: string;
  github: string;
}

const EMPTY_FORM: FormState = {
  college: "",
  degree: "",
  cgpa: "",
  bio: "",
  linkedin: "",
  github: "",
};

export function ProfilePage() {
  const { profile, isLoading, hasNoProfile, loadError, refetch } = useProfile();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [skills, setSkills] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        college: profile.college ?? "",
        degree: profile.degree ?? "",
        cgpa: profile.cgpa != null ? String(profile.cgpa) : "",
        bio: profile.bio ?? "",
        linkedin: profile.linkedin ?? "",
        github: profile.github ?? "",
      });
      setSkills(skillsToChips(profile.skills));
    }
  }, [profile]);

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSaving) return;

    const nextErrors: Record<string, string> = {};
    if (form.cgpa && (isNaN(Number(form.cgpa)) || Number(form.cgpa) < 0 || Number(form.cgpa) > 10)) {
      nextErrors.cgpa = "Enter a CGPA between 0 and 10.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSaving(true);
    try {
      await profileApi.update({
        college: form.college.trim(),
        degree: form.degree.trim(),
        cgpa: form.cgpa ? Number(form.cgpa) : null,
        skills: chipsToSkills(skills),
        bio: form.bio.trim(),
        linkedin: form.linkedin.trim(),
        github: form.github.trim(),
      });
      toast.success("Profile saved.");
      await refetch();
    } catch (error) {
      const { message, fieldErrors } = parseApiError(error);
      setErrors(fieldErrors);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

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

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={profile?.name ?? "Student"} className="h-12 w-12 text-sm" />
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">
              {profile?.name ?? "Your profile"}
            </h1>
            <div className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-muted">
              <Mail className="h-3.5 w-3.5" /> {profile?.email}
            </div>
          </div>
        </div>
      </div>

      {hasNoProfile && (
        <Card className="border-accent/25 bg-accent-soft p-5">
          <p className="text-sm text-ink">
            <strong className="font-semibold">Complete your profile</strong>{" "}
            — this is what powers your resume, matching, and readiness across
            PrepVerse.
          </p>
        </Card>
      )}

      <Card className="p-5 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold text-ink">
          Profile completeness
        </h2>
        <ProfileCompletion profile={profile} />
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="mb-5 text-sm font-semibold text-ink">
          Career identity
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="College"
              value={form.college}
              onChange={(e) => updateField("college", e.target.value)}
              placeholder="SPPU"
            />
            <Input
              label="Degree"
              value={form.degree}
              onChange={(e) => updateField("degree", e.target.value)}
              placeholder="BE Information Technology"
            />
            <Input
              label="CGPA"
              type="number"
              step="0.01"
              min={0}
              max={10}
              value={form.cgpa}
              onChange={(e) => updateField("cgpa", e.target.value)}
              error={errors.cgpa}
              placeholder="8.6"
            />
            <Input
              label="LinkedIn"
              value={form.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
              placeholder="linkedin-profile"
              rightElement={<Linkedin className="h-4 w-4 text-ink-faint" />}
            />
          </div>

          <Input
            label="GitHub"
            value={form.github}
            onChange={(e) => updateField("github", e.target.value)}
            placeholder="github-profile"
            rightElement={<Github className="h-4 w-4 text-ink-faint" />}
          />

          <SkillChips skills={skills} editable onChange={setSkills} />

          <Textarea
            label="Bio"
            rows={4}
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Engineering student interested in software development and AI."
          />

          <div className="flex justify-end">
            <Button type="submit" isLoading={isSaving}>
              <Save className="h-4 w-4" /> Save changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
