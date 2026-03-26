"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface SpotlightTextProps {
  text1: string;
  text2: string;
  className?: string;
  sizeClassName?: string;
}

export default function SpotlightText({
  text1,
  text2,
  className = "",
  sizeClassName = "text-5xl md:text-7xl lg:text-8xl"
}: SpotlightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
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

  // Create a radial gradient mask that follows the mouse
  const maskImage = useMotionTemplate`radial-gradient(150px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-crosshair select-none w-fit group ${className}`}
    >
      {/* ── BASE LAYER: Subtle & Stroked ── */}
      <h2 className={`${sizeClassName} font-black tracking-tight font-display leading-[0.93]`}>
        {/* Solid First Part (Muted by default) */}
        <span className="text-main/80 transition-colors duration-500">
          {text1}
        </span>
        <br />
        {/* Stroked Second Part */}
        <span
          className="text-transparent transition-all duration-500"
          style={{ WebkitTextStroke: "1px rgba(167, 139, 250, 0.3)" }}
        >
          {text2}
        </span>
      </h2>

      {/* ── REVEAL LAYER: Solid/Glowing (Masked by Spotlight) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          opacity: isHovered ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={`${sizeClassName} font-black tracking-tight font-display leading-[0.93]`}>
          {/* Brighter text1 on hover */}
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            {text1}
          </span>
          <br />
          {/* Filled text2 on hover */}
          <span className="text-accent drop-shadow-[0_0_20px_rgba(167,139,250,0.6)]">
            {text2}
          </span>
        </h2>
      </motion.div>
    </div>
  );
}
