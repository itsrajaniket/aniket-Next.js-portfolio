"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks";
import type { Project } from "@/types";

// Gradient fallbacks per accent color — shows when image is missing/broken
const FALLBACK_GRADIENTS: Record<string, string> = {
  cyan:    "from-cyan-900/80 via-slate-900 to-slate-900",
  indigo:  "from-indigo-900/80 via-slate-900 to-slate-900",
  purple:  "from-purple-900/80 via-slate-900 to-slate-900",
  violet:  "from-violet-900/80 via-slate-900 to-slate-900",
  amber:   "from-amber-900/80 via-slate-900 to-slate-900",
  sky:     "from-sky-900/80 via-slate-900 to-slate-900",
  teal:    "from-teal-900/80 via-slate-900 to-slate-900",
  green:   "from-green-900/80 via-slate-900 to-slate-900",
  orange:  "from-orange-900/80 via-slate-900 to-slate-900",
  pink:    "from-pink-900/80 via-slate-900 to-slate-900",
  default: "from-slate-800 via-slate-900 to-slate-900",
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
          boxShadow: "0 0 30px rgba(34,211,238,0.45), 0 0 60px rgba(34,211,238,0.15)",
          transition: { duration: 0.25 },
        }
      }
      className="group relative rounded-2xl overflow-hidden project-card border border-white/10 hover:border-accent/60 transition-colors h-full flex flex-col bg-slate-900/60"
      aria-label={`Project: ${project.title}`}
    >
      {/* Background — image with gradient fallback */}
      <div className="absolute inset-0">
        {!imgError ? (
          <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          // Gradient fallback when image is missing
          <div className={`w-full h-full bg-gradient-to-br ${fallback} flex items-center justify-center`}>
            <i className={`${project.icon} text-6xl opacity-10 text-white`} aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-slate-900/92 group-hover:bg-slate-900/80 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header: icon + links */}
        <div className="flex justify-between items-start mb-4">
          <i className={`${project.icon} text-accent text-3xl drop-shadow-lg`} aria-hidden="true" />
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition"
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
                className="text-slate-300 hover:text-accent transition"
                aria-label={`View ${project.title} live demo`}
              >
                <i className="fas fa-external-link-alt text-xl" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-300 text-sm mb-6 flex-grow font-medium leading-relaxed">
          {project.description}
        </p>

        {/* Footer: tags + CTA */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-white hover:text-accent transition ml-3 shrink-0"
              aria-label={`Open ${project.title} live demo`}
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
