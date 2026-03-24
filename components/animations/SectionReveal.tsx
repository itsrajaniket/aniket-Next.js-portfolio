"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import type { ReactNode, ElementType } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
}

export default function SectionReveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  id,
}: SectionRevealProps) {
  const prefersReduced = useReducedMotion();

  const MotionTag = motion.create(Tag as ElementType);

  return (
    <MotionTag
      id={id}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: prefersReduced ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
