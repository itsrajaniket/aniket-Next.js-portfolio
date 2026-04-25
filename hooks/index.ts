"use client";

import { useEffect, useState } from "react";

// ── useReducedMotion ───────────────────────────────────────────────────────
// Custom implementation — avoids framer-motion version fragmentation
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

// ── useActiveSection ───────────────────────────────────────────────────────
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.pageYOffset + window.innerHeight / 2;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollMid >= el.offsetTop) current = id;
      }

      // Force-activate last section when scrolled to bottom
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return active;
}

// ── useScrolled ────────────────────────────────────────────────────────────
// Returns true when page has scrolled past a threshold
export function useScrolled(threshold = 500): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

// ── useScrollDirection ──────────────────────────────────────────────────────
export function useScrollDirection(): "up" | "down" {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      // Minimum scroll threshold to avoid jitter
      if (Math.abs(scrollY - lastScrollY) < 10) return;

      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
}
