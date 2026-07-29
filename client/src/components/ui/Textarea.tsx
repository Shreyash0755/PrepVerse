import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-ink-muted"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={cn(
            "w-full rounded-md border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint",
            "transition-colors duration-150 outline-none resize-none",
            "focus:border-accent focus:ring-2 focus:ring-accent-soft",
            error ? "border-danger" : "border-border-strong",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
        {!error && hint && <p className="text-xs text-ink-faint">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
