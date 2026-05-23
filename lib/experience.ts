import type { ExperienceItem, EducationItem, ServiceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    period: "Apr 2026 — Present",
    title: "MERN Full Stack Intern",
    subtitle: "Alit Technologies · Indore (Hybrid)",
    description:
      "Developing scalable full-stack web applications using MongoDB, Express.js, React, and Node.js. Contributing to architectural decisions and performance optimizations within a hybrid team environment.",
    badge: "Internship",
    badgeColor: "green",
    type: "work",
  },
  {
    period: "2024 — Present",
    title: "Frontend Developer",
    subtitle: "Freelance / Self-Employed",
    description:
      "Building production-grade React applications and delivering end-to-end SaaS solutions. Shipped ReviewClick AI (a reputation management platform using Gemini 1.5 Flash), a live restaurant ordering app, and a 550+ company job search dashboard. Focused on performance optimization and modern Next.js architecture.",
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
    title: "Full-Stack SaaS Development",
    description:
      "MERN + Next.js end-to-end development. Building scalable, performant web applications with responsive frontends and robust backends.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    accentColor: "purple",
  },
  {
    title: "AI/GenAI Integration",
    description:
      "Embedding OpenAI, Claude, and Gemini into web applications to build intelligent workflows, prompt pipelines, and agentic systems.",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.97-2.883a1 1 0 00-1.178 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.519-4.674z",
    accentColor: "emerald",
  },
  {
    title: "Payment Gateway Integration",
    description:
      "Implementing secure checkout experiences and subscription flows in production using Razorpay and Stripe.",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    accentColor: "pink",
  },
  {
    title: "API Design & Backend Architecture",
    description:
      "Designing clean REST APIs, robust authentication layers with JWT, and scalable Node.js microservices.",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    accentColor: "blue",
  },
];
