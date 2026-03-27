"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5 z-[100]">
      <motion.div
        className="h-full bg-accent origin-left shadow-[0_0_20px_rgba(34,211,238,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
}
