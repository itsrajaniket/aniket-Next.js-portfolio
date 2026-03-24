"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placehoder to avoid layout shift
  }

  return (
    <button
      onClick={() => setTheme(theme === "cyberpunk" ? "sunset" : "cyberpunk")}
      className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform hover:border-accent group"
      aria-label="Toggle Theme"
    >
      <i
        className={`fas ${theme === "cyberpunk" ? "fa-sun text-accent" : "fa-moon text-primary"} transition-colors duration-300 drop-shadow-md`}
        aria-hidden="true"
      />
    </button>
  );
}
