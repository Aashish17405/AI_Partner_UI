import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New flat design tokens
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-loud": "var(--border-loud)",
        lime: "var(--lime)",
        "lime-dark": "var(--lime-dark)",
        pink: "var(--pink)",
        blue: "var(--blue)",
        // Keep old tokens for any remaining usage
        background: "var(--bg)",
        foreground: "var(--text)",
        primary: "var(--lime)",
        "primary-foreground": "#000000",
        secondary: "var(--surface-2)",
        "secondary-foreground": "var(--text)",
        accent: "var(--pink)",
        "accent-foreground": "var(--text)",
        muted: "var(--surface)",
        "muted-foreground": "var(--text-muted)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
