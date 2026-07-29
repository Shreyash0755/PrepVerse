import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateRegisterForm } from "@/utils/validation";
import { parseApiError } from "@/utils/apiError";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateRegisterForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      setSuccess(true);
      toast.success("Account created — sign in to continue.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      const { message, fieldErrors } = parseApiError(error);
      setErrors(fieldErrors);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <AuthShell
        eyebrow="account_created"
        title="Your profile is ready to build."
        subtitle="Sign in to start setting up your preparation dashboard."
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <CheckCircle2 className="h-6 w-6 text-accent-bright" />
          </div>
          <h1 className="font-display text-xl font-semibold text-ink">
            Account created
          </h1>
          <p className="text-sm text-ink-muted">
            Taking you to sign in…
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="register()"
      title="Create your PrepVerse profile."
      subtitle="One account for your resume, applications, and prep — nothing fabricated, nothing gated."
    >
      <div className="mb-7 space-y-1">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Create your account
        </h1>
        <p className="text-sm text-ink-muted">
          Already have one?{" "}
          <Link to="/login" className="font-medium text-accent-bright hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          error={errors.name}
          placeholder="Aditi Sharma"
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          placeholder="you@college.edu"
        />
        <PasswordInput
          label="Password"
          autoComplete="new-password"
          value={values.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={errors.password}
          hint="At least 8 characters."
          placeholder="••••••••"
        />
        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(e) => updateField("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          placeholder="••••••••"
        />
        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
