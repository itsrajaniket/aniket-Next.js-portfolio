"use client";

// Tracks which sections users actually visit + how far they scroll
// This fires GA events automatically — no extra setup needed

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const SECTIONS = [
  "home", "about", "skills", "work",
  "projects", "services", "education", "blog", "contact",
];

export default function AnalyticsEvents() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    // ── Section visibility tracking ──────────────────────────────────────
    // Fires a GA event when user scrolls INTO each section
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.gtag?.("event", "section_view", {
                event_category: "engagement",
                event_label: id,
                section_name: id,
              });
            }
          });
        },
        { threshold: 0.4 } // fires when 40% of section is visible
      );

      observer.observe(el);
      observers.push(observer);
    });

    // ── Scroll depth milestones ──────────────────────────────────────────
    // Fires once at 25%, 50%, 75%, 100% scroll depth
    const milestones = new Set<number>();

    const trackScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.round((scrolled / total) * 100);

      [25, 50, 75, 100].forEach((milestone) => {
        if (pct >= milestone && !milestones.has(milestone)) {
          milestones.add(milestone);
          window.gtag?.("event", "scroll_depth", {
            event_category: "engagement",
            event_label: `${milestone}%`,
            value: milestone,
          });
        }
      });
    };

    window.addEventListener("scroll", trackScroll, { passive: true });

    // ── Outbound link tracking ────────────────────────────────────────────
    // Tracks clicks on GitHub, LinkedIn, live demo links
    const trackOutbound = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("http") && !href.includes("itsrajaniket")) {
        window.gtag?.("event", "outbound_click", {
          event_category: "engagement",
          event_label: href,
          transport_type: "beacon",
        });
      }
    };

    document.addEventListener("click", trackOutbound);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", trackScroll);
      document.removeEventListener("click", trackOutbound);
    };
  }, []);

  return null; // renders nothing — pure side effects
}
