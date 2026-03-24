import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        dark: "#020617",
        
        // Semantic Theme Map
        base: "rgb(var(--bg-base) / <alpha-value>)",
        card: "rgb(var(--bg-card) / <alpha-value>)",
        "section-contact": "rgb(var(--bg-section-contact) / <alpha-value>)",
        "section-blog": "rgb(var(--bg-section-blog) / <alpha-value>)",
        "section-skills": "rgb(var(--bg-section-skills) / <alpha-value>)",
        "section-projects": "rgb(var(--bg-section-projects) / <alpha-value>)",
        "section-services": "rgb(var(--bg-section-services) / <alpha-value>)",
        "section-education": "rgb(var(--bg-section-education) / <alpha-value>)",
        "section-work": "rgb(var(--bg-section-work) / <alpha-value>)",
        main: "rgb(var(--text-main) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        surfaceBorder: "rgb(var(--border-subtle) / <alpha-value>)",
        inverseBase: "rgb(var(--inverse-base) / <alpha-value>)",
        inverseText: "rgb(var(--inverse-text) / <alpha-value>)",
      },
      // fontFamily: {
      //   display: ["var(--font-display)", "Orbitron", "sans-serif"],
      //   sans: ["var(--font-body)", "Rajdhani", "sans-serif"],
      //   mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      // },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        blob: "blob 7s infinite",
        glow: "glow 3s infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        typewriter: "typewriter 0.1s steps(1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    // ── Glass utility ──────────────────────────────────────────────────────
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".glass": {
          background: "rgba(var(--bg-card), 0.75)",
          backdropFilter: "blur(14px) saturate(1.4)",
          "-webkit-backdrop-filter": "blur(14px) saturate(1.4)",
          border: "1px solid rgba(var(--border-subtle), 0.09)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(var(--border-subtle), 0.07), inset 0 -1px 0 rgba(0,0,0,0.2)",
          transform: "translateZ(0)",
        },
        ".glass-light": {
          background: "rgba(var(--bg-card), 0.45)",
          backdropFilter: "blur(8px) saturate(1.2)",
          "-webkit-backdrop-filter": "blur(8px) saturate(1.2)",
          border: "1px solid rgba(var(--border-subtle), 0.06)",
          transform: "translateZ(0)",
        },
        ".tech-tag": {
          fontSize: "11px",
          fontWeight: "700",
          color: "rgb(var(--accent))",
          letterSpacing: "0.05em",
          background: "rgba(var(--accent), 0.08)",
          padding: "1px 6px",
          borderRadius: "3px",
          border: "1px solid rgba(var(--accent), 0.2)",
        },
        ".neon-border-cyan": {
          boxShadow:
            "0 0 30px rgba(var(--accent), 0.45), 0 0 60px rgba(var(--accent), 0.15)",
        },
        ".text-gradient": {
          background: "linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)))",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
        },
      });
    }),
  ],
};

export default config;
