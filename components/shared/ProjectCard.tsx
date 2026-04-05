"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks";
import type { Project } from "@/types";

// Gradient fallbacks per accent color — shows when image is missing/broken
const FALLBACK_GRADIENTS: Record<string, string> = {
  cyan:    "from-cyan-900/80 via-card to-card",
  indigo:  "from-indigo-900/80 via-card to-card",
  purple:  "from-purple-900/80 via-card to-card",
  violet:  "from-violet-900/80 via-card to-card",
  amber:   "from-amber-900/80 via-card to-card",
  sky:     "from-sky-900/80 via-card to-card",
  teal:    "from-teal-900/80 via-card to-card",
  green:   "from-green-900/80 via-card to-card",
  orange:  "from-orange-900/80 via-card to-card",
  pink:    "from-pink-900/80 via-card to-card",
  default: "from-card via-card to-card",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const fallback = FALLBACK_GRADIENTS[project.accentColor ?? "default"] ?? FALLBACK_GRADIENTS.default;

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: prefersReduced ? 0 : index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        prefersReduced ? undefined : {
          y: -10,
          transition: { duration: 0.25 },
        }
      }
      className="group relative rounded-2xl overflow-hidden border border-surfaceBorder/10 hover:border-accent/50 transition-all h-full flex flex-col bg-card/60 backdrop-blur-sm will-change-transform"
      aria-label={`Project: ${project.title}`}
    >
      {/* Top Half: Image */}
      <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-card">
        {!imgError ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            placeholder="blur"
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallback} flex items-center justify-center`}>
            <i className={`${project.icon} text-6xl opacity-20 text-main`} aria-hidden="true" />
          </div>
        )}
        
        {/* Subtle gradient to blend image into the card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

        {/* Floating icon badge */}
        <div className="absolute top-4 left-4 w-10 h-10 glass rounded-xl flex items-center justify-center border border-surfaceBorder/20 shadow-lg">
          <i className={`${project.icon} text-accent text-lg drop-shadow-md`} aria-hidden="true" />
        </div>
      </div>

      {/* Bottom Half: Content */}
      <div className="relative z-10 p-6 flex flex-col flex-grow">
        
        {/* Title & Links */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-main group-hover:text-accent transition-colors leading-tight">
            {project.title}
          </h3>
          <div className="flex gap-3 shrink-0 mt-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-main transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <i className="fab fa-github text-xl" aria-hidden="true" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
                aria-label={`View ${project.title} live demo`}
              >
                <i className="fas fa-external-link-alt text-xl" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted text-sm mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Tags & Live Demo CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-surfaceBorder/5">
          <div className="flex gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] font-mono tracking-widest text-accent uppercase bg-accent/10 px-2 py-1 rounded-md border border-accent/20">
                {tag}
              </span>
            ))}
          </div>
          
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-muted hover:text-accent transition-colors shrink-0 group/link flex items-center gap-1"
              aria-label={`Open ${project.title} live demo`}
            >
              Demo 
              <i className="fas fa-arrow-right text-[10px] group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
