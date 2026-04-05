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
  { name: "Primary", var: "--primary" },
  { name: "Secondary", var: "--secondary" },
  { name: "Accent", var: "--accent" },
  { name: "Background", var: "--bg-base" },
  { name: "Card/Surface", var: "--bg-card" },
  { name: "Text Main", var: "--text-main" },
  { name: "Text Muted", var: "--text-muted" },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState<Record<string, string>>({});
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
    
    setColors(initialColors);
  }, []);

  const handleColorChange = (variable: string, hexValue: string) => {
    const rgbValue = hexToRgbVars(hexValue);
    document.documentElement.style.setProperty(variable, rgbValue);
    setColors((prev) => ({ ...prev, [variable]: rgbValue }));
  };

  const copyConfig = () => {
    const cssBlock = THEME_VARIABLES.map(
      (v) => `    ${v.var}: ${colors[v.var]};`
    ).join("\n");
    
    const fullBlock = `:root, [data-theme='cyberpunk'] {\n${cssBlock}\n}`;
    navigator.clipboard.writeText(fullBlock);
    alert("Theme configuration copied to clipboard! Paste it into globals.css.");
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
            <h3 className="font-display font-bold text-main">Theme Engine</h3>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Live Mod
            </span>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
            {THEME_VARIABLES.map((item) => (
              <div key={item.var} className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-main">{item.name}</span>
                  <span className="text-[9px] font-mono text-muted uppercase">
                    {item.var}
                  </span>
                </div>
                <input
                  type="color"
                  value={rgbVarsToHex(colors[item.var] || "")}
                  onChange={(e) => handleColorChange(item.var, e.target.value)}
                  className="h-8 w-12 cursor-pointer bg-transparent border-none p-0 rounded-md"
                />
              </div>
            ))}
          </div>

          <button
            onClick={copyConfig}
            className="mt-6 w-full py-3 bg-white/[0.03] hover:bg-accent hover:text-inverseText border border-surfaceBorder/10 rounded-xl text-xs font-bold transition-all"
          >
            <i className="fas fa-copy mr-2" />
            Copy Current Config
          </button>
          
          <p className="mt-3 text-[10px] text-muted text-center italic">
            *Paste copied values into globals.css for persistence.
          </p>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--accent), 0.2); border-radius: 2px; }
      `}</style>
    </div>
  );
}
