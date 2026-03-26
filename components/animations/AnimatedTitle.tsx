"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  text1: string;
  text2: string;
  className?: string;
}

export default function AnimatedTitle({ 
  text1, 
  text2, 
  className = "text-4xl lg:text-6xl font-black font-display tracking-tight leading-tight" 
}: AnimatedTitleProps) {
  return (
    <h2 className={`flex flex-wrap gap-x-3 md:gap-x-4 ${className}`}>
      {/* Part 1: Solid Text fading in */}
      <motion.span
        className="text-main drop-shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {text1}
      </motion.span>

      {/* Part 2: Outlined Text sweeping carefully to Solid Accent */}
      <span className="relative inline-block w-fit">
        <motion.span
          className="block text-transparent"
          style={{ WebkitTextStroke: "2px rgba(167, 139, 250, 0.3)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {text2}
        </motion.span>
        
        <motion.span
          className="absolute top-0 left-0 text-accent overflow-hidden whitespace-nowrap drop-shadow-[0_0_20px_rgba(167,139,250,0.4)]"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
        >
          {text2}
        </motion.span>
      </span>
    </h2>
  );
}
