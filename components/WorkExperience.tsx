"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks";
import SectionReveal from "./SectionReveal";

const SHOWCASE = [
  {
    id: "maharani",
    type: "Freelance",
    typeBadge: "bg-amber-500/15 border-amber-500/30 text-amber-300",
    period: "2025",
    title: "Maharani Food Plaza",
    subtitle: "Restaurant Website — Live Client Project",
    description:
      "Full freelance delivery for a restaurant in Indore. Built a premium multi-page site with GSAP scroll animations, interactive menu filters, and EmailJS reservation form. Client went live with zero revisions.",
    highlights: [
      "Client brief → design → delivery in under 2 weeks",
      "GSAP ScrollTrigger animations throughout",
      "Interactive menu with live category filtering",
      "EmailJS reservation form — no backend required",
    ],
    tags: ["HTML5", "CSS3", "JAVASCRIPT", "GSAP", "EMAILJS"],
    liveUrl: "https://itsrajaniket.github.io/freelance-restaurant-app/",
    github: null,
    image: "/images/project-maharani.jpg",
    accentColor: "#f59e0b",
    accentRgb: "245,158,11",
    accentGrad: "from-amber-500 to-orange-600",
    bgGrad: "from-amber-950/80 via-slate-900/95 to-slate-900",
    icon: "fas fa-utensils",
    metrics: [
      { value: "8 wks", label: "Delivery" },
      { value: "4", label: "Revisions" },
      { value: "Live", label: "Status" },
    ],
  },
  {
    id: "jobtracker",
    type: "Freelance",
    typeBadge: "bg-purple-500/15 border-purple-500/30 text-purple-300",
    period: "2025",
    title: "Corporate Job Tracker",
    subtitle: "SaaS-style Productivity App — Vercel",
    description:
      "Built to solve a real pain during my own job search. Kanban board with drag-and-drop columns, deadline alerts via Notification API, rich company notes, and one-click CSV export. Zero backend — fully client-side.",
    highlights: [
      "Drag-and-drop Kanban powered by @dnd-kit",
      "Browser Notification API for deadline reminders",
      "Company notes with rich text editing",
      "CSV export — works fully offline",
    ],
    tags: ["REACT", "DND-KIT", "TAILWIND CSS", "NOTIFICATION API"],
    liveUrl: "https://corporate-job-tracker.vercel.app/",
    github: "https://github.com/itsrajaniket",
    image: "/images/project-jobtracker.jpg",
    accentColor: "#a855f7",
    accentRgb: "168,85,247",
    accentGrad: "from-purple-500 to-violet-600",
    bgGrad: "from-purple-950/80 via-slate-900/95 to-slate-900",
    icon: "fas fa-briefcase",
    metrics: [
      { value: "Vercel", label: "Deployed" },
      { value: "0 API", label: "Backend" },
      { value: "Real", label: "Users" },
    ],
  },
  {
    id: "habitbuilder",
    type: "Personal",
    typeBadge: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
    period: "2026",
    title: "Habit Builder Kit",
    subtitle: "Productivity App — Redux Architecture",
    description:
      "Fully offline productivity app with production-grade Redux Toolkit architecture. Framer Motion drives animated streak visualizations and progress rings. localStorage persistence — no backend, no cost.",
    highlights: [
      "Redux Toolkit with typed slices and selectors",
      "Framer Motion streak & progress ring animations",
      "Offline-first — works without internet",
      "Dark glassmorphism UI built from scratch",
    ],
    tags: ["REACT", "REDUX TOOLKIT", "FRAMER MOTION", "TAILWIND CSS"],
    liveUrl: "https://habit-builder-kit.vercel.app/",
    github: "https://github.com/itsrajaniket",
    image: "/images/project-habit.jpg",
    accentColor: "#22d3ee",
    accentRgb: "34,211,238",
    accentGrad: "from-cyan-500 to-blue-600",
    bgGrad: "from-cyan-950/80 via-slate-900/95 to-slate-900",
    icon: "fas fa-check-circle",
    metrics: [
      { value: "Redux", label: "State" },
      { value: "Vercel", label: "Deployed" },
      { value: "100%", label: "Offline" },
    ],
  },
];

const TIMELINE = [
  {
    period: "2024 — Present",
    role: "Freelance Frontend Developer",
    company: "Self-Employed · Remote · Indore",
    badge: "Active",
    badgeClass: "bg-green-500/15 border-green-500/30 text-green-300",
    dot: "bg-green-400",
    pulse: true,
    description:
      "Building React/Next.js applications for clients. Delivered restaurant websites, job trackers, and portfolio tools. Specializing in animations, performance, and zero-backend architecture.",
    tags: ["REACT", "NEXT.JS", "TAILWIND", "TYPESCRIPT", "FRAMER MOTION"],
  },
  // {
  //   period: "2021 — 2024",
  //   role: "UPSC Civil Services Preparation",
  //   company: "Full-time · Career Sabbatical",
  //   badge: "Sabbatical",
  //   badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-300",
  //   dot: "bg-amber-400",
  //   pulse: false,
  //   description:
  //     "Three years of intensive preparation sharpened analytical thinking and structured problem decomposition — skills that transfer directly to software architecture and debugging.",
  //   tags: ["ANALYTICAL THINKING", "SELF-DISCIPLINE", "PROBLEM SOLVING"],
  // },
];

// ── 3D tilt card hook ──────────────────────────────────────────────────────
function useTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [enabled, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, rotX, rotY, onMove, onLeave };
}

export default function WorkExperience() {
  const prefersReduced = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  return (
    <section
      id="work"
      className="pt-8 pb-20 lg:pb-28 relative overflow-hidden bg-[#07101f]"
      aria-label="Work Experience and Featured Projects"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[160px] animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[140px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <SectionReveal className="mb-16">
          <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
            03. Experience & Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What I&apos;ve{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Built & Delivered
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl text-lg">
            Real client work, real deployments. Click any card to explore.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-6" />
        </SectionReveal>

        {/* Showcase cards */}
        <div className="space-y-10 mb-24">
          {SHOWCASE.map((project, idx) => (
            <ShowcaseCard
              key={project.id}
              project={project}
              idx={idx}
              prefersReduced={!!prefersReduced}
              isHovered={hoveredId === project.id}
              anyHovered={hoveredId !== null}
              onHover={setHoveredId}
              imgError={imgErrors.has(project.id)}
              onImgError={() => setImgErrors((s) => new Set(s).add(project.id))}
            />
          ))}
        </div>

        {/* Career Timeline */}
        <SectionReveal className="mb-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <h3 className="text-lg font-bold text-white px-4">
              Career Timeline
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </SectionReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />
          <div className="space-y-5">
            {TIMELINE.map((item, idx) => (
              <SectionReveal key={item.role} delay={idx * 0.15}>
                <div className="relative pl-16">
                  {/* Dot */}
                  <div className="absolute left-[18px] top-6 flex items-center justify-center">
                    <div
                      className={`w-4 h-4 rounded-full ${item.dot} border-2 border-[#07101f] z-10`}
                    />
                    {item.pulse && (
                      <div
                        className={`absolute w-4 h-4 rounded-full ${item.dot} opacity-40 animate-ping`}
                      />
                    )}
                  </div>

                  <motion.div
                    whileHover={prefersReduced ? undefined : { x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="glass rounded-2xl border border-white/10 hover:border-accent/30 p-5 transition-colors cursor-default"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-accent font-bold tracking-widest uppercase">
                        {item.period}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                      {item.pulse && (
                        <span className="flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Now
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-black text-white mb-0.5">
                      {item.role}
                    </h4>
                    <p className="text-slate-500 text-xs font-medium mb-3">
                      {item.company}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Individual showcase card ───────────────────────────────────────────────
interface CardProps {
  project: (typeof SHOWCASE)[0];
  idx: number;
  prefersReduced: boolean;
  isHovered: boolean;
  anyHovered: boolean;
  onHover: (id: string | null) => void;
  imgError: boolean;
  onImgError: () => void;
}

function ShowcaseCard({
  project,
  idx,
  prefersReduced,
  isHovered,
  anyHovered,
  onHover,
  imgError,
  onImgError,
}: CardProps) {
  const isEven = idx % 2 === 0;
  const tilt = useTilt(!prefersReduced);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: idx * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={
        {
          rotateX: tilt.rotX,
          rotateY: tilt.rotY,
          transformStyle: "preserve-3d",
          opacity: anyHovered && !isHovered ? 0.55 : 1,
          transition: "opacity 0.3s ease",
          boxShadow: isHovered
            ? `0 0 0 1px rgba(${project.accentRgb},0.4), 0 25px 60px -10px rgba(${project.accentRgb},0.25)`
            : "none",
        } as React.CSSProperties
      }
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={() => {
        tilt.onLeave();
        onHover(null);
      }}
      onMouseEnter={() => onHover(project.id)}
      className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer group"
      aria-label={`Featured project: ${project.title}`}
    >
      <div className={`grid lg:grid-cols-2`}>
        {/* ── Image panel ──────────────────────────────────────────────── */}
        <div
          className={`relative min-h-[280px] lg:min-h-[400px] overflow-hidden ${!isEven ? "lg:order-2" : ""}`}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.bgGrad}`}
          />

          {/* Project image */}
          {!imgError ? (
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={onImgError}
              />
              {/* Dark overlay that lifts on hover */}
              <motion.div
                className="absolute inset-0 bg-slate-950/60"
                animate={{ opacity: isHovered ? 0.3 : 0.6 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <i
                className={`${project.icon} text-8xl opacity-10 text-white`}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Edge fade toward content */}
          <div
            className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent via-transparent to-slate-900/70`}
          />

          {/* Type badge */}
          <motion.div
            className="absolute top-4 left-4"
            animate={{ y: isHovered ? 0 : 4, opacity: 1 }}
            initial={{ opacity: 1 }}
          >
            <span
              className={`px-3 py-1.5 rounded-full border text-xs font-bold backdrop-blur-sm ${project.typeBadge}`}
            >
              {project.type}
            </span>
          </motion.div>

          {/* "Open project" hover hint */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: showPreview ? 1 : 0,
              scale: showPreview ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-dark flex items-center gap-2"
              style={{ background: project.accentColor }}
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-external-link-alt text-xs" />
              Open Live Site
            </a>
          </motion.div>

          {/* Metrics strip */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              className="flex gap-2"
              animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.35 }}
            >
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex-1 rounded-xl px-3 py-2 text-center border border-white/10 backdrop-blur-md"
                  style={{ background: "rgba(2,6,23,0.7)" }}
                >
                  <p
                    className="text-sm font-black"
                    style={{ color: project.accentColor }}
                  >
                    {m.value}
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold leading-none mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Content panel ─────────────────────────────────────────────── */}
        <div
          className={`relative p-7 lg:p-10 flex flex-col justify-center bg-slate-900/90 ${!isEven ? "lg:order-1" : ""}`}
        >
          {/* Subtle glow behind content */}
          <motion.div
            className="absolute inset-0 rounded-r-2xl pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: `radial-gradient(ellipse at 0% 50%, rgba(${project.accentRgb},0.08) 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            {/* Icon + period */}
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                style={{ background: `rgba(${project.accentRgb},0.15)` }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <i
                  className={`${project.icon} text-base`}
                  style={{ color: project.accentColor }}
                  aria-hidden="true"
                />
              </motion.div>
              <span className="text-xs text-slate-500 font-mono font-bold uppercase tracking-widest">
                {project.period}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-1 leading-tight">
              {project.title}
            </h3>
            <p
              className="text-sm font-semibold mb-4"
              style={{ color: project.accentColor }}
            >
              {project.subtitle}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Highlights — animate in stagger on hover */}
            <ul className="space-y-2 mb-5">
              {project.highlights.map((h, hIdx) => (
                <motion.li
                  key={h}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                  animate={{
                    x: isHovered && !prefersReduced ? 0 : -4,
                    opacity: isHovered ? 1 : 0.75,
                  }}
                  transition={{ duration: 0.3, delay: hIdx * 0.05 }}
                >
                  <motion.i
                    className="fas fa-check text-xs mt-1 shrink-0"
                    style={{ color: project.accentColor }}
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    transition={{ duration: 0.2, delay: hIdx * 0.05 }}
                    aria-hidden="true"
                  />
                  {h}
                </motion.li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((t) => (
                <motion.span
                  key={t}
                  className="tech-tag"
                  animate={{
                    borderColor: isHovered
                      ? `rgba(${project.accentRgb},0.35)`
                      : "rgba(34,211,238,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-bold rounded-xl text-sm text-dark"
                  style={{ background: project.accentColor }}
                  whileHover={prefersReduced ? undefined : { scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`Open ${project.title} live demo`}
                >
                  <i
                    className="fas fa-external-link-alt text-xs"
                    aria-hidden="true"
                  />
                  Live Demo
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 glass border border-white/10 text-white font-bold rounded-xl text-sm hover:text-accent transition-colors"
                  whileHover={prefersReduced ? undefined : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`View ${project.title} source code`}
                >
                  <i className="fab fa-github text-sm" aria-hidden="true" />
                  Source Code
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
