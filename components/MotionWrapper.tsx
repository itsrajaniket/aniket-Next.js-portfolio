"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import type { ReactNode } from "react";

// Wraps page content in a fade-in motion div.
// NOTE: No AnimatePresence here — this is a single-page portfolio,
// all navigation is anchor-based, so page transitions aren't needed.
// AnimatePresence is only needed for multi-page apps with route changes.
export default function MotionWrapper({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
