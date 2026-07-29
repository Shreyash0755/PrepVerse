/** @type {import('tailwindcss').Config} */

// Lets classes like bg-danger/20 or border-accent/30 work correctly by
// substituting the alpha value into an rgb() function at build time.
function withOpacity(cssVar) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${cssVar}))`
      : `rgb(var(${cssVar}) / ${opacityValue})`;
}

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        accent: {
          DEFAULT: withOpacity("--accent-rgb"),
          bright: withOpacity("--accent-bright-rgb"),
          soft: "var(--accent-soft)",
          ink: "var(--accent-ink)",
        },
        danger: withOpacity("--danger-rgb"),
        warn: withOpacity("--warn-rgb"),
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.25)",
        glow: "0 0 0 1px var(--accent-soft), 0 0 24px -4px var(--accent-soft)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 48px" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        blink: "blink 1.1s step-end infinite",
        "grid-pan": "grid-pan 6s linear infinite",
      },
    },
  },
  plugins: [],
};
