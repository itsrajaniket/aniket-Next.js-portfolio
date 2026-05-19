"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "@/hooks";

interface Certificate {
  filename: string;
  title: string;
  path: string;
}

export default function CertificationsGallery({ certificates }: { certificates: Certificate[] }) {
  const prefersReduced = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Deterministic scatter physics to avoid hydration mismatches
  const getRotation = (idx: number) => {
    const angles = [-6, 4, -8, 5, -4, 7, -5, 3];
    return angles[idx % angles.length];
  };

  const getOffset = (idx: number) => {
    const offsets = [
      { x: 0, y: 15 },
      { x: -12, y: -5 },
      { x: 10, y: 8 },
      { x: -8, y: 18 },
      { x: 12, y: -12 },
    ];
    return offsets[idx % offsets.length];
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8 py-12 relative z-10 px-4">
      {certificates.map((cert, idx) => {
        const isHovered = hoveredIdx === idx;
        const rotation = getRotation(idx);
        const offset = getOffset(idx);

        return (
          <motion.a
            key={cert.filename}
            href={cert.path}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCert(cert);
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, scale: 0.8, rotate: prefersReduced ? 0 : rotation }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: prefersReduced ? 0 : idx * 0.1,
            }}
            animate={
              !prefersReduced
                ? {
                  rotate: isHovered ? 0 : rotation,
                  scale: isHovered ? 1.05 : 1,
                  y: isHovered ? -15 : offset.y,
                  x: isHovered ? 0 : offset.x,
                  zIndex: isHovered ? 50 : 0,
                }
                : {}
            }
            className="group relative origin-center transition-all glass-light p-3 rounded-2xl border border-surfaceBorder/20 shadow-xl hover:shadow-[0_0_40px_rgba(var(--accent),0.2)] hover:border-accent/40 w-full sm:w-[320px] md:w-[380px] lg:w-[420px] cursor-pointer"
          >
            {/* Image Wrapper */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950/80 border border-white/5">
              <Image
                src={cert.path}
                alt={cert.title}
                fill
                className="object-cover object-center md:grayscale-[25%] group-hover:grayscale-0 transition-all duration-700 md:blur-[2px] group-hover:blur-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Overlay title */}
              <div className="absolute bottom-5 left-5 right-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-main drop-shadow-md">
                    {cert.title}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-accent text-inverseText flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <i className="fas fa-search-plus text-xs" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        );
      })}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95vw] h-[85vh] max-w-5xl rounded-xl overflow-hidden glass-light border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default flex items-center justify-center p-2 md:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/40 hover:bg-black/70 border border-white/10 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Close lightbox"
              >
                <i className="fas fa-times" />
              </button>
              
              {/* Standard img tag bypasses Next.js optimization limits for huge raw images */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedCert.path}
                alt={selectedCert.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
