"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { useReducedMotion } from "@/hooks";
import ProjectCard from "@/components/shared/ProjectCard";
import SectionReveal from "@/components/animations/SectionReveal";

const FILTERS = ["All", "React", "JavaScript", "Web API", "Tools"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_MAP: Record<Filter, (tags: string[]) => boolean> = {
  All:        () => true,
  React:      (tags) => tags.some((t) => t.includes("REACT")),
  JavaScript: (tags) => tags.some((t) => ["JS", "ES6+", "FETCH", "JSON"].some((k) => t.includes(k))),
  "Web API":  (tags) => tags.some((t) => t.includes("API") || t.includes("WEB")),
  Tools:      (tags) => tags.some((t) => ["HTML", "CSS", "GSAP", "NEON"].some((k) => t.includes(k))),
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const prefersReduced = useReducedMotion();

  const filtered = projects.filter((p) => FILTER_MAP[activeFilter](p.tags));

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  return (
    <section
      id="projects"
      className="pt-8 pb-20 lg:pb-28 relative overflow-hidden"
      aria-label="Projects"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#060d1a] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <SectionReveal className="text-center mb-12">
          <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
            04. Projects
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A collection of projects built with modern web technologies. Each one solves a real problem.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6" />
        </SectionReveal>

        {/* Filter pills */}
        <SectionReveal delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                activeFilter === f
                  ? "bg-accent text-dark border-accent shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  : "glass border-white/10 text-slate-300 hover:border-accent/50 hover:text-accent"
              }`}
              aria-pressed={activeFilter === f}
              aria-label={`Filter projects by ${f}`}
            >
              {f}
            </button>
          ))}
        </SectionReveal>

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-live="polite"
          aria-label={`Showing ${filtered.length} projects`}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 mt-12 text-lg">
            No projects found for this filter.
          </p>
        )}

        {/* GitHub CTA */}
        <SectionReveal delay={0.3} className="text-center mt-14">
          <a
            href="https://github.com/itsrajaniket"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 glass border border-white/10 text-white font-bold rounded-xl hover:border-accent hover:text-accent transition-all"
            aria-label="View all projects on GitHub"
          >
            <i className="fab fa-github text-xl" aria-hidden="true" />
            View All on GitHub
            <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
