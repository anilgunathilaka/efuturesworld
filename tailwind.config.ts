import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: "#F6F9FC",
        surface2: "#EAF1F8",
        ink: "#0D0F12",
        "ink-soft": "#54565C",
        "ink-faint": "#84868B",
        accent: "#0093FD",
        "accent-deep": "#006EBE",
        "accent-tint": "#E6F4FF",
        line: "#E3E7EB",
        "line-strong": "#C7CDD3",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1440px",
        "header-pill": "920px",
        "header-wide": "1440px",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};

export default config;
