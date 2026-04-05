"use client";

import React, { useEffect, useState } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────

// Convert hex (#ffffff) to space-separated RGB (255 255 255)
const hexToRgbVars = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
};

// Convert space-separated RGB (255 255 255) to hex (#ffffff)
const rgbVarsToHex = (rgb: string) => {
  if (!rgb) return "#000000";
  const parts = rgb.split(/\s+/).map((v) => parseInt(v.trim()));
  if (parts.length !== 3 || parts.some(isNaN)) return "#000000";
  const [r, g, b] = parts;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const THEME_VARIABLES = [
  { name: "Accent", var: "--accent" },
  { name: "Background", var: "--bg-base" },
  { name: "Card/Surface", var: "--bg-card" },
  { name: "Text Main", var: "--text-main" },
  { name: "Text Muted", var: "--text-muted" },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [glow, setGlow] = useState(0.45);
  const [particles, setParticles] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Initialize from actual computed styles
  useEffect(() => {
    setMounted(true);
    const initialColors: Record<string, string> = {};
    const styles = getComputedStyle(document.documentElement);

    THEME_VARIABLES.forEach((item) => {
      const val = styles.getPropertyValue(item.var).trim();
      initialColors[item.var] = val;
    });

    const initialGlow = parseFloat(styles.getPropertyValue("--glow-strength").trim() || "0.45");
    const initialParticles = parseFloat(styles.getPropertyValue("--particle-density").trim() || "1");
    setGlow(initialGlow);
    setParticles(initialParticles);
    setColors(initialColors);
  }, []);

  const handleColorChange = (variable: string, hexValue: string) => {
    const rgbValue = hexToRgbVars(hexValue);
    document.documentElement.style.setProperty(variable, rgbValue);
    setColors((prev) => ({ ...prev, [variable]: rgbValue }));
  };

  const handleGlowChange = (val: number) => {
    setGlow(val);
    document.documentElement.style.setProperty("--glow-strength", val.toString());
  };

  const handleParticleChange = (val: number) => {
    setParticles(val);
    document.documentElement.style.setProperty("--particle-density", val.toString());
    window.dispatchEvent(new CustomEvent("reinitParticles"));
  };

  const copyConfig = () => {
    const cssBlock = THEME_VARIABLES.map(
      (v) => `    ${v.var}: ${colors[v.var]};`
    ).join("\n") + `\n    --glow-strength: ${glow};\n    --particle-density: ${particles};`;

    const fullBlock = `:root, [data-theme='cyberpunk'] {\n${cssBlock}\n}`;
    navigator.clipboard.writeText(fullBlock);
    alert("🚀 Theme copied! Share below with dev to update.");

  };

  const resetTheme = () => {
    if (confirm("Reset theme to original defaults?")) {
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-24 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-inverseText shadow-lg shadow-accent/20 transition-transform active:scale-90 hover:scale-110"
        title="Customize Theme Colors"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-palette"} text-xl`} />
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="pointer-events-auto w-72 glass rounded-2xl border border-surfaceBorder/10 p-6 shadow-2xl animate-fade-in">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-main">Design Playground</h3>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20 animate-pulse">
              Interactive
            </span>
          </div>

          <p className="text-[10px] text-muted mb-4 leading-tight">
            Experiment with the site&apos;s DNA. Changes are temporary and will reset on refresh.
          </p>

          <div className="space-y-4">
            {THEME_VARIABLES.map((item) => (
              <div key={item.var} className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-main tracking-wide">{item.name}</span>
                  <span className="text-[9px] font-mono text-muted uppercase opacity-60">
                    {item.var}
                  </span>
                </div>
                <input
                  type="color"
                  value={rgbVarsToHex(colors[item.var] || "")}
                  onChange={(e) => handleColorChange(item.var, e.target.value)}
                  className="h-7 w-10 cursor-pointer bg-transparent border-none p-0 rounded-md overflow-hidden"
                />
              </div>
            ))}

            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-main tracking-wide">Glow Strength</span>
                <span className="text-[10px] font-mono text-accent">{Math.round(glow * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={glow}
                onChange={(e) => handleGlowChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-main tracking-wide">Spider Density</span>
                <span className="text-[10px] font-mono text-accent">{Math.round(particles * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={particles}
                onChange={(e) => handleParticleChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={copyConfig}
              className="w-full py-2.5 bg-white/[0.03] hover:bg-accent hover:text-inverseText border border-surfaceBorder/10 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center"
            >
              <i className="fas fa-code mr-2" />
              Export CSS for Devs
            </button>
            <button
              onClick={resetTheme}
              className="w-full py-2.5 bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 text-red-400 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center"
            >
              <i className="fas fa-undo mr-2" />
              Reset to Defaults
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
