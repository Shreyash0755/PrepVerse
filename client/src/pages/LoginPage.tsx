import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateLoginForm } from "@/utils/validation";
import { parseApiError } from "@/utils/apiError";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateLoginForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login(values);
      toast.success("Welcome back.");
      const redirectTo =
        (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const { message, fieldErrors } = parseApiError(error);
      setErrors(fieldErrors);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="login()"
      title="Pick up your prep where you left off."
      subtitle="Your profile, resume progress, and applications are all right where you left them."
    >
      <div className="mb-7 space-y-1">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Sign in
        </h1>
        <p className="text-sm text-ink-muted">
          New to PrepVerse?{" "}
          <Link
            to="/register"
            className="font-medium text-accent-bright hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
          autoComplete="current-password"
          value={values.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={errors.password}
          placeholder="••••••••"
        />
        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
