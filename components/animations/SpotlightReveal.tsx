"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface SpotlightRevealProps {
  children: React.ReactNode;
  className?: string;
  spotlightSize?: number;
}

export default function SpotlightReveal({
  children,
  className = "",
  spotlightSize = 200
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth movement
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    // Snap to position immediately on enter to prevent the "fly-in" glitch from 0,0
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.jump(e.clientX - left);
      mouseY.jump(e.clientY - top);
    }
    setIsHovered(true);
  }

  const maskImage = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group cursor-default ${className}`}
    >
      {/* ── BASE LAYER: Readable Muted Text ── */}
      {/* Removed select-none so users can copy the text if needed */}
      <div className="text-muted/80 transition-opacity duration-500 group-hover:opacity-60">
        {children}
      </div>

      {/* ── REVEAL LAYER: Full Brightness & Colorful Glow ── */}
      <motion.div
        // Removed select-text (useless with pointer-events-none)
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          // Removed inline opacity to let Framer Motion handle it via animate{}
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-main drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}