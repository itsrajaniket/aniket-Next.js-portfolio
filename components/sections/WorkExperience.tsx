"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll, useSpring, AnimatePresence, type MotionValue } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "@/hooks";
import SectionReveal from "@/components/animations/SectionReveal";
import AnimatedTitle from "@/components/animations/AnimatedTitle";

const SHOWCASE = [
  {
    id: "maharani",
    type: "Freelance",
    typeBadge: "bg-amber-500/15 border-amber-500/30 text-amber-300",
    period: "2025",
    title: "Maharani Food Plaza",
    subtitle: "Restaurant Ordering App — Live Client Project",
    description:
      "Full freelance delivery for a live restaurant client in Indore. A zero-build, mobile-first ordering platform with a serverless WhatsApp checkout — brief to deployment in under 2 weeks, zero revision cycles.",
    fullDetails: {
      overview: "A mobile-first, zero-build restaurant ordering system built for a live client in Indore. Bridges the gap between physical dining and digital ordering using WhatsApp as a serverless communication bridge — eliminating third-party delivery commissions entirely.",
      problem: "Local restaurants face high overheads for native apps or lose revenue to delivery platforms. This project delivers a lightning-fast digital menu with a native app-like feel, hosted statically anywhere at zero running cost.",
      tech: "Zero-Build Architecture using HTML5, Vanilla JavaScript ES6+, and Tailwind CSS via CDN — no Node, no bundler, no backend. Entire app runs from a single app.js file.",
      features: [
        "Serverless WhatsApp Checkout: Cart state serialized, URI-encoded via encodeURIComponent, and dispatched as a formatted order to the owner via wa.me API — no payment gateway needed.",
        "Real-Time Fuzzy Search: Filters and highlights matched text across the entire menuData array dynamically on every keystroke.",
        "Scroll-Spy Navigation: Uses getBoundingClientRect() to auto-highlight the active menu category as users scroll.",
        "Haptic Feedback: navigator.vibrate(50ms) on every cart interaction for a premium native app feel on mobile.",
        "CSS Skeleton Screen: Hardcoded skeleton renders before JS execution for instant perceived performance.",
        "Data-Driven Rendering: Entire menu UI, filters, and search generated from a single menuData array — update one object, entire UI adapts."
      ],
      technicalHighlights: [
        "GPU Accelerated Motion: All transitions use CSS transform and translate classes to bypass CPU repaints — strict 60FPS on mobile hardware.",
        "Memory-Safe Cart: delete cart[itemId] when quantity hits 0, preventing stale key allocations from hanging in memory.",
        "Zero-Build Pipeline: Tailwind config injected via app.js object, bypassing the need for a Node build environment entirely.",
        "window.matchMedia: Detects OS-level dark/light preference on first load before any user interaction."
      ]
    },
    highlights: [
      "Live client — brief to deployment in under 2 weeks",
      "Zero revision cycles — shipped production-ready",
      "Serverless WhatsApp checkout via wa.me API",
      "Haptic feedback & scroll-spy navigation",
    ],
    tags: ["HTML5", "VANILLA JS", "TAILWIND CSS", "WHATSAPP API", "VIBRATION API"],
    liveUrl: "https://itsrajaniket.github.io/freelance-restaurant-app/",
    github: null,
    image: "/images/project-maharani.jpg",
    accentColor: "#f59e0b",
    accentRgb: "245,158,11",
    accentGrad: "from-amber-500 to-orange-600",
    bgGrad: "from-amber-950/80 via-slate-900/95 to-slate-900",
    icon: "fas fa-utensils",
    metrics: [
      { value: "< 2 wks", label: "Delivery" },
      { value: "0", label: "Revisions" },
      { value: "Live", label: "Status" },
    ],
  },
  {
    id: "jobtracker",
    type: "Personal",
    typeBadge: "bg-purple-500/15 border-purple-500/30 text-purple-300",
    period: "2025",
    title: "Corporate Job Tracker",
    subtitle: "SaaS-Style Dashboard — Firebase + React 19",
    description:
      "A full-stack job search command center for Indian IT job seekers. Searchable database of 550+ companies, Google OAuth, real-time Firestore sync, live market analytics, and a 6-tool salary calculator suite.",
    fullDetails: {
      overview: "A high-performance React 19 application serving as a centralized job search dashboard. Built to solve a real pain during the developer's own job hunt — it replaces scattered spreadsheets with a 550+ company database featuring policy transparency (Notice Period, Buyout availability), cloud-synced tracking, and financial planning tools.",
      problem: "Tracking hundreds of applications manually and calculating complex tax/salary offers is error-prone and time-consuming. This tool centralizes everything — market data, application status, and career finances — into one offline-capable dashboard.",
      tech: "React 19 with Vite, Firebase Auth (Google OAuth) and Firestore for real-time cloud sync, Chart.js for market analytics, and a custom useLocalStorage hook for offline-first state management.",
      features: [
        "550+ Company Database: Searchable, filterable master list of Indian IT/corporate firms with Notice Period and Buyout policy data for each.",
        "Google OAuth + Firestore Sync: Secure authentication with real-time cloud sync — application statuses update locally and push to Firestore in parallel.",
        "6-Tool Salary Calculator Suite: In-Hand salary, Tax Breakup (New Regime), Offer Comparison, Exit Date, Tenure, and Hourly Value calculators — all auto-calculating in real time.",
        "Market Analytics Dashboard: Chart.js Doughnut and Bar charts aggregating industry distributions and buyout availability across the entire company dataset.",
        "JSON Backup & Restore: Complete data export via Blob + FileReader APIs — works fully offline, no server interaction.",
        "Custom Company Integration: Add unlisted startups via CustomCompanyForm with duplicate-blocking deduplication logic."
      ],
      technicalHighlights: [
        "Memoized O(n) Filtering: useMemo wraps complex cross-filter computations over 550+ company records — eliminates search-bar stutter on every keystroke.",
        "Offline-First Hybrid State: Custom useLocalStorage hook writes instantly to localStorage; async saveToCloud() pushes to Firestore in parallel — UI never waits on the network.",
        "Firebase Auth Observer: onAuthStateChanged tightly integrated with useEffect for instant UI-gating — tracker visibility resolves the moment auth context switches.",
        "Array Deduplication: Array.from(new Map()) intercepts identically-named entries before render mapping, preventing React key collision errors on 550+ item lists."
      ]
    },
    highlights: [
      "550+ company database with policy transparency",
      "Google OAuth + real-time Firestore cloud sync",
      "6-tool salary & tax calculator suite",
      "Offline-first with useMemo-optimized O(n) filtering",
    ],
    tags: ["REACT 19", "FIREBASE", "FIRESTORE", "CHART.JS", "TAILWIND CSS"],
    liveUrl: "https://corporate-job-tracker.vercel.app/",
    github: "https://github.com/itsrajaniket",
    image: "/images/project-jobtracker.jpg",
    accentColor: "#a855f7",
    accentRgb: "168,85,247",
    accentGrad: "from-purple-500 to-violet-600",
    bgGrad: "from-purple-950/80 via-slate-900/95 to-slate-900",
    icon: "fas fa-briefcase",
    metrics: [
      { value: "550+", label: "Companies" },
      { value: "6 Tools", label: "Calculators" },
      { value: "Live", label: "Deployed" },
    ],
  },
  {
    id: "habitbuilder",
    type: "Personal",
    typeBadge: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
    period: "2026",
    title: "Habit Builder Kit",
    subtitle: "Full-Stack Productivity App — Zustand + Supabase",
    description:
      "A gamified, offline-first daily habit tracker with zero-latency local state, Supabase PostgreSQL cloud sync with Row Level Security, a Web Audio API sound engine, and a canvas confetti system — all without a single external asset.",
    fullDetails: {
      overview: "A modern, high-fidelity daily habit tracker built for professionals and self-improvement enthusiasts. Solves goal abandonment by turning daily check-ins into an addictive, rewarding loop through gamification, procedural audio, and mental wellness correlation analytics.",
      problem: "Most habit apps feel like chores. This app makes consistency rewarding — XP gains, streak freezes, badge unlocks, and a synthesized sound effect on every check-in create a feedback loop that keeps users returning daily.",
      tech: "React 18 with Vite, Zustand with persist middleware for offline-first state across 7 modular slices, Supabase PostgreSQL with Row Level Security for cloud sync, and Chart.js for wellness analytics.",
      features: [
        "Zero-Latency Offline-First Engine: Zustand persist writes instantly to localStorage — UI never waits. A non-blocking background worker silently upserts to Supabase PostgreSQL in parallel.",
        "7 Modular Zustand Slices: habits, completions, streaks, mentalState, notes, auth, and ui — Redux-style domain separation without Redux boilerplate.",
        "Supabase Row Level Security: PostgreSQL RLS policy ensures each user can only read and write their own habit_data — auth.uid() enforced at the database level.",
        "Web Audio API Sound Engine: createOscillator + createGain synthesizes check/uncheck chimes and level-up sounds entirely in-browser — zero MP3 files fetched.",
        "Canvas Confetti Engine: requestAnimationFrame animates 120 custom particles on Perfect Day completion — built from scratch, no library.",
        "Gamification: XP leveling, automatic Streak Freeze token awards on Perfect Days, and an organic Badge Board (7-day streak, 100 habits completed, etc.).",
        "Mental Wellness Analytics: Daily Mood and Motivation logged on 1-10 sliders, correlated against habit completion in Chart.js line graphs.",
        "Share Card Generator: HTML Canvas API composites user stats and gradients into a downloadable social media graphic via URL.createObjectURL()."
      ],
      technicalHighlights: [
        "Row Level Security (RLS): Supabase PostgreSQL policy — auth.uid() = user_id — enforces data isolation at the DB layer, not just the application layer.",
        "Non-Blocking Database Sink: All Supabase upsert calls are fire-and-forget background tasks. localStorage is the single source of truth for renders — loading spinners eliminated entirely.",
        "CSS Grid Heatmap: 365-day yearly heatmap rendered via CSS Grid calculations in dateUtils.js — no JS reflowing, remains performant across the full year.",
        "Freemium Pro Gate: ProGate.jsx soft-caps free users at 5 habits, with a Razorpay checkout flow for lifetime Pro upgrade — demonstrating full product lifecycle thinking."
      ]
    },
    highlights: [
      "Offline-first Zustand + Supabase sync with RLS",
      "Web Audio API sound engine — zero external assets",
      "Canvas confetti via requestAnimationFrame",
      "Gamified XP, streak freezes & badge system",
    ],
    tags: ["REACT 18", "ZUSTAND", "SUPABASE", "WEB AUDIO API", "CHART.JS"],
    liveUrl: "https://habit-builder-kit.vercel.app/",
    github: "https://github.com/itsrajaniket",
    image: "/images/project-habit.jpg",
    accentColor: "#22d3ee",
    accentRgb: "34,211,238",
    accentGrad: "from-cyan-500 to-blue-600",
    bgGrad: "from-cyan-950/80 via-slate-900/95 to-slate-900",
    icon: "fas fa-check-circle",
    metrics: [
      { value: "7", label: "Zustand Slices" },
      { value: "RLS", label: "DB Security" },
      { value: "100%", label: "Offline" },
    ],
  },
];

const TIMELINE = [
  {
    period: "Apr 2026 — Present",
    role: "MERN Full Stack Intern",
    company: "Alit Technologies · Indore",
    badge: "Internship",
    badgeClass: "bg-green-500/15 border-green-500/30 text-green-300",
    dot: "bg-green-400",
    pulse: true,
    description:
      "Developing scalable full-stack web applications utilizing MongoDB, Express.js, React, and Node.js. Contributing to architectural decisions, API design, and frontend performance optimizations within a collaborative hybrid engineering environment.",
    tags: ["REACT", "NEXT.JS", "NODE.JS", "EXPRESS", "MONGODB"],
  },
  {
    period: "2024 — Present",
    role: "Freelance Frontend Developer",
    company: "Self-Employed · Remote · India",
    badge: "Active",
    badgeClass: "bg-green-500/15 border-green-500/30 text-green-300",
    dot: "bg-green-400",
    pulse: true,
    description:
      "Building production-grade React applications and delivering freelance projects end-to-end. Shipped a live client restaurant ordering app, a 550+ company job search dashboard with Firebase, and a full-stack gamified habit tracker with Supabase. Focused on offline-first architecture, browser API depth, and zero-backend patterns.",
    tags: ["REACT", "NEXT.JS", "FIREBASE", "SUPABASE", "ZUSTAND", "TAILWIND", "TYPESCRIPT"],
  },
];

// ── 3D tilt card hook (Optimized) ─────────────────────────────────────────
function useTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reduced stiffness and added mass for a more 'buttery' smooth glide
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
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
  const [activeProject, setActiveProject] = useState<(typeof SHOWCASE)[0] | null>(null);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeProject]);

  return (
    <section
      id="work"
      className="pt-8 pb-20 lg:pb-28 relative overflow-hidden bg-section-work"
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
          <AnimatedTitle
            text1="What I've"
            text2="Built & Delivered"
            className="mb-4"
          />
          <p className="text-muted max-w-xl text-lg">
            Real client work, real deployments. Click any card to explore details.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-6" />
        </SectionReveal>

        {/* Showcase cards - Stacked Container (350vh for 3 cards) */}
        <div ref={container} className="relative mb-24">
          {SHOWCASE.map((project, idx) => {
            const targetScale = 1 - ((SHOWCASE.length - idx) * 0.05);
            return (
              <ShowcaseCard
                key={project.id}
                project={project}
                idx={idx}
                progress={scrollYProgress}
                range={[idx * 0.25, (idx + 1) * 0.25]}
                targetScale={targetScale}
                prefersReduced={!!prefersReduced}
                isHovered={hoveredId === project.id}
                anyHovered={hoveredId !== null}
                onHover={setHoveredId}
                imgError={imgErrors.has(project.id)}
                onImgError={() => setImgErrors((s) => new Set(s).add(project.id))}
                onClick={() => setActiveProject(project)}
              />
            );
          })}
        </div>

        {/* Career Timeline */}
        <SectionReveal className="mb-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <h3 className="text-lg font-bold text-main px-4">
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
                      className={`w-4 h-4 rounded-full ${item.dot} border-2 border-section-work z-10`}
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
                    className="bg-card/50 rounded-2xl border border-surfaceBorder/10 hover:border-accent/30 p-5 transition-colors cursor-default backdrop-blur-sm will-change-transform"
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
                    <h4 className="text-lg font-black text-main mb-0.5">
                      {item.role}
                    </h4>
                    <p className="text-muted text-xs font-medium mb-3">
                      {item.company}
                    </p>
                    <p className="text-muted text-sm leading-relaxed mb-4">
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Individual showcase card ───────────────────────────────────────────────
interface CardProps {
  project: (typeof SHOWCASE)[0];
  idx: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  prefersReduced: boolean;
  isHovered: boolean;
  anyHovered: boolean;
  onHover: (id: string | null) => void;
  imgError: boolean;
  onImgError: () => void;
  onClick: () => void;
}

function ShowcaseCard({
  project,
  idx,
  progress,
  range,
  targetScale,
  prefersReduced,
  isHovered,
  anyHovered,
  onHover,
  imgError,
  onImgError,
  onClick,
}: CardProps) {
  const isEven = idx % 2 === 0;
  const tilt = useTilt(!prefersReduced);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky mb-[20vh] flex items-center justify-center"
      style={{
        zIndex: idx + 1,
        top: `calc(5rem + ${idx * 40}px)`
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.65,
          delay: idx * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onClick={onClick}
        style={
          {
            scale,
            rotateX: tilt.rotX,
            rotateY: tilt.rotY,
            transformStyle: "preserve-3d",
            willChange: "transform", // Enforces GPU hardware acceleration
            opacity: anyHovered && !isHovered ? 0.55 : 1,
            transition: "opacity 0.4s ease, box-shadow 0.4s ease", // Smooth transition for non-motion values
            boxShadow: isHovered
              ? `0 0 0 1px rgb(${project.accentRgb} / 0.4), 0 25px 60px -10px rgb(${project.accentRgb} / var(--glow-strength))`
              : "0 0 0 1px rgba(255,255,255,0.05), 0 0px 0px 0px rgba(0,0,0,0)",
          }
        }
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={() => {
          tilt.onLeave();
          onHover(null);
        }}
        onMouseEnter={() => onHover(project.id)}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        aria-label={`Featured project: ${project.title}`}
      >
        <div className={`grid lg:grid-cols-2`}>
          {/* ── Image panel ──────────────────────────────────────────────── */}
          <div
            className={`relative min-h-[280px] lg:min-h-[400px] overflow-hidden ${!isEven ? "lg:order-2" : ""}`}
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
                  className={`${project.icon} text-8xl opacity-10 text-main`}
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

            {/* Click hint */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-accent">
                Click to view details
              </div>
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
                    className="flex-1 rounded-xl px-3 py-2 text-center border border-surfaceBorder/10 backdrop-blur-md"
                    style={{ background: "rgba(2,6,23,0.7)" }}
                  >
                    <p
                      className="text-sm font-black"
                      style={{ color: project.accentColor }}
                    >
                      {m.value}
                    </p>
                    <p className="text-xs text-muted uppercase tracking-wider font-bold leading-none mt-0.5">
                      {m.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Content panel ─────────────────────────────────────────────── */}
          <div
            className={`relative p-7 lg:p-10 flex flex-col justify-center bg-card/80 ${!isEven ? "lg:order-1" : ""}`}
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-surfaceBorder/10"
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
                <span className="text-xs text-muted font-mono font-bold uppercase tracking-widest">
                  {project.period}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-black text-main mb-1 leading-tight">
                {project.title}
              </h3>
              <p
                className="text-sm font-semibold mb-4"
                style={{ color: project.accentColor }}
              >
                {project.subtitle}
              </p>
              <p className="text-muted text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Highlights — animate in stagger on hover */}
              <ul className="space-y-2 mb-5">
                {project.highlights.map((h, hIdx) => (
                  <motion.li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-muted"
                    animate={{
                      x: isHovered ? 0 : -4,
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
                        : "rgba(var(--accent),0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* Direct CTA */}
              <div className="flex items-center gap-4">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-sm text-inverseText"
                    style={{ background: project.accentColor }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-external-link-alt text-xs" />
                    Live Demo
                  </motion.a>
                )}
                <button
                  onClick={onClick}
                  className="text-xs font-bold text-muted hover:text-accent transition-colors flex items-center gap-2"
                >
                  About Project
                  <i className="fas fa-plus text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Project Detail Modal Component ───────────────────────────────────────
function ProjectDetailModal({ project, onClose }: { project: (typeof SHOWCASE)[0], onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-card border border-white/10 rounded-3xl shadow-2xl flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-main hover:text-accent transition-colors"
          aria-label="Close modal"
        >
          <i className="fas fa-times" />
        </button>

        <div className="overflow-y-auto custom-scrollbar flex-1">
          {/* Hero Section */}
          <div className="relative h-[250px] lg:h-[400px] w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent`} />

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-3"
              >
                <span className={`w-fit px-3 py-1 rounded-full border text-xs font-bold ${project.typeBadge}`}>
                  {project.type}
                </span>
                <h2 className="text-4xl lg:text-6xl font-black text-main leading-none">
                  {project.title}
                </h2>
                <p className="text-lg lg:text-xl font-semibold opacity-90" style={{ color: project.accentColor }}>
                  {project.subtitle}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-8 lg:p-12 grid lg:grid-cols-3 gap-12">
            {/* Main info */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h3 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">01. Overview</h3>
                <p className="text-muted text-lg leading-relaxed">
                  {project.fullDetails.overview}
                </p>
              </section>

              <section>
                <h3 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">02. The Problem</h3>
                <p className="text-muted text-lg leading-relaxed">
                  {project.fullDetails.problem}
                </p>
              </section>

              <section>
                <h3 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">03. Key Features</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {project.fullDetails.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex gap-3 items-start"
                    >
                      <i className="fas fa-bolt text-accent mt-1" />
                      <span className="text-sm text-muted leading-snug">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>

              {project.fullDetails.technicalHighlights && (
                <section>
                  <h3 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">04. Technical Highlights</h3>
                  <div className="space-y-3">
                    {project.fullDetails.technicalHighlights.map((highlight, i) => {
                      const [title, desc] = highlight.includes(":")
                        ? [highlight.split(":")[0], highlight.split(":")[1]]
                        : ["Insight", highlight];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                          className="p-4 rounded-2xl bg-slate-900/30 border border-white/5 border-l-2 border-l-accent"
                        >
                          <p className="text-sm text-main font-bold mb-1">
                            {title}
                          </p>
                          <p className="text-xs text-muted leading-relaxed">
                            {desc}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-8">
              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                <h4 className="text-main font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-layer-group text-accent text-sm" />
                  Technical Core
                </h4>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {project.fullDetails.tech}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(t => (
                    <span key={t} className="tech-tag text-[10px] bg-slate-950/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                <h4 className="text-main font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-accent text-sm" />
                  Key Metrics
                </h4>
                <div className="space-y-4">
                  {project.metrics.map(m => (
                    <div key={m.label} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs text-muted uppercase tracking-wider font-bold">{m.label}</span>
                      <span className="text-sm font-black text-main">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-sm text-inverseText transition-transform active:scale-95"
                    style={{ background: project.accentColor }}
                  >
                    <i className="fas fa-external-link-alt" />
                    Visit Live Site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-sm bg-slate-900 border border-white/10 text-main hover:bg-slate-800 transition-all active:scale-95"
                  >
                    <i className="fa-brands fa-github" />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
