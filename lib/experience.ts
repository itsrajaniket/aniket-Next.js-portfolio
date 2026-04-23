import type { ExperienceItem, EducationItem, ServiceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    period: "2024 — Present",
    title: "Frontend Developer",
    subtitle: "Freelance / Self-Employed",
    description:
      "Building production-grade React applications, portfolio sites, and interactive web tools for clients. Focused on performance optimization and modern Next.js architecture.",
    badge: "Active",
    badgeColor: "green",
    type: "work",
  },
  {
    period: "2021 — 2024",
    title: "UPSC / Govt Exam Preparation",
    subtitle: "Career Sabbatical",
    description:
      "Dedicated time for intensive preparation for civil services examinations. Developed strong analytical and problem-solving skills.",
    badge: "Career Sabbatical",
    badgeColor: "amber",
    type: "sabbatical",
  },
  {
    period: "2019 — 2021",
    title: "M.Sc. Electronics & Communication",
    subtitle: "Ranchi University",
    description:
      "Advanced study in electronics, communication systems, and signal processing. Applied computational thinking and developed early programming skills.",
    badge: "CGPA: 8.81",
    badgeColor: "cyan",
    type: "study",
  },
];

export const education: EducationItem[] = [
  {
    period: "Present",
    degree: "Full-Stack Web Development",
    institution: "Self-Directed / Online",
    badge: "In Progress",
    accentColor: "green",
  },
  {
    period: "2021 — 2024",
    degree: "UPSC / Govt Exams",
    institution: "Career Sabbatical",
    badge: "Career Sabbatical",
    accentColor: "amber",
  },
  {
    period: "2019 — 2021",
    degree: "M.Sc. Electronics & Comm.",
    institution: "Ranchi University",
    badge: "CGPA: 8.81",
    accentColor: "cyan",
  },
  {
    period: "2016 — 2019",
    degree: "B.Sc. Physics",
    institution: "Gossner College, Ranchi",
    badge: "Score: 63%",
    accentColor: "purple",
  },
  {
    period: "2014 — 2016",
    degree: "Higher Secondary (12th)",
    institution: "DPS, Ranchi (CBSE) — PCM",
    badge: "Score: 70%",
    accentColor: "blue",
  },
  {
    period: "2013 — 2014",
    degree: "Secondary School (10th)",
    institution: "St. Jude's Vidyalaya (CBSE)",
    badge: "CGPA: 9.8",
    accentColor: "emerald",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, interactive, and highly performant user interfaces using modern frameworks like React and Next.js.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    accentColor: "purple",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive user experiences with clean, modern aesthetics and user-centric design principles.",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    accentColor: "pink",
  },
  {
    title: "Backend & APIs",
    description:
      "Developing secure, scalable server-side logic and RESTful APIs using Node.js and Next.js Route Handlers.",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    accentColor: "blue",
  },
  {
    title: "Performance Tuning",
    description:
      "Optimizing load times, Core Web Vitals, and web architecture to ensure lightning-fast user experiences.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    accentColor: "emerald",
  },
  {
    title: "Component Systems",
    description:
      "Architecting scalable, reusable design systems and component libraries with Storybook and Radix UI.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    accentColor: "orange",
  },
  {
    title: "SEO & Accessibility",
    description:
      "Implementing semantic HTML, ARIA attributes, and Next.js metadata APIs for maximum search visibility and WCAG compliance.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    accentColor: "teal",
  },
];
