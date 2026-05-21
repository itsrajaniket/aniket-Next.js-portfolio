"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useState, useEffect } from "react";

// ── Dynamic Imports for Performance ───────────────────────────────────────────
// These components are heavy and should be loaded lazily on the client only.
const DynamicMouseTrail = dynamic(() => import("@/components/visuals/MouseTrailCanvas"), {
  ssr: false,
});
const DynamicThemeCustomizer = dynamic(() => import("@/components/theme/ThemeCustomizer"), {
  ssr: false,
});
const DynamicCursorTrail = dynamic(() => import("@/components/animations/CustomCursorTrail"), {
  ssr: false,
});

export default function ClientLayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setIsInteracted(true);
      ['mousemove', 'scroll', 'touchstart', 'keydown'].forEach((event) =>
        window.removeEventListener(event, handleInteraction)
      );
    };

    const timer = setTimeout(handleInteraction, 4000);

    ['mousemove', 'scroll', 'touchstart', 'keydown'].forEach((event) =>
      window.addEventListener(event, handleInteraction, { once: true })
    );

    return () => {
      clearTimeout(timer);
      ['mousemove', 'scroll', 'touchstart', 'keydown'].forEach((event) =>
        window.removeEventListener(event, handleInteraction)
      );
    };
  }, []);
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="cyberpunk" enableSystem={false}>
      <GoogleAnalytics />
      <UmamiAnalytics />
      <Analytics />
      <SpeedInsights />
      {isInteracted && (
        <>
          <DynamicMouseTrail />
          <DynamicCursorTrail />
        </>
      )}
      <DynamicThemeCustomizer />
      {children}
    </ThemeProvider>
  );
}
