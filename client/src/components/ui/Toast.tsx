import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--surface-raised)",
          color: "var(--ink)",
          border: "1px solid var(--border-strong)",
          fontSize: "0.875rem",
          borderRadius: "10px",
        },
        success: {
          iconTheme: {
            primary: "#34d399",
            secondary: "var(--accent-ink)",
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
