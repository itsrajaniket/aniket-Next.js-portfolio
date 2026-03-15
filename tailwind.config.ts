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
        primary: "#6366f1",
        secondary: "#a855f7",
        accent: "#22d3ee",
        dark: "#020617",
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
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(14px) saturate(1.4)",
          "-webkit-backdrop-filter": "blur(14px) saturate(1.4)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.2)",
        },
        ".glass-light": {
          background: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(8px) saturate(1.2)",
          "-webkit-backdrop-filter": "blur(8px) saturate(1.2)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        },
        ".tech-tag": {
          fontSize: "11px",
          fontWeight: "700",
          color: "#67e8f9",
          letterSpacing: "0.05em",
          background: "rgba(34, 211, 238, 0.08)",
          padding: "1px 6px",
          borderRadius: "3px",
          border: "1px solid rgba(34, 211, 238, 0.2)",
        },
        ".neon-border-cyan": {
          boxShadow:
            "0 0 30px rgba(34,211,238,0.45), 0 0 60px rgba(34,211,238,0.15)",
        },
        ".text-gradient": {
          background: "linear-gradient(135deg, #6366f1, #22d3ee)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
        },
      });
    }),
  ],
};

export default config;
