import type { Project } from "@/types";

import habitImg from "@/public/images/project-habit.jpg";
import markdownImg from "@/public/images/project-markdown.png";
import beatreactorImg from "@/public/images/project-beatreactor.jpg";
import jobtrackerImg from "@/public/images/project-jobtracker.jpg";
import maharaniImg from "@/public/images/project-maharani.jpg";
import weatherImg from "@/public/images/project-weather.jpg";
import speechImg from "@/public/images/project-speech.jpg";
import qrImg from "@/public/images/project-qr.jpg";
import dogImg from "@/public/images/project-dog.jpg";
import claudeImg from "@/public/images/project-claude.png";

export const projects: Project[] = [
  {
    id: "claude-counter",
    title: "Token Tracker for Claude",
    description:
      "A privacy-first modern browser extension for Claude.ai granting real-time token tracking, 5-minute context cache countdowns, and exact session usage bars injected seamlessly into the native UI.",
    tags: ["JAVASCRIPT", "MANIFEST V3", "WEB APIS"],
    github: "https://github.com/itsrajaniket/Claude-Counter-Browser-Extension",
    live: "https://github.com/itsrajaniket/Claude-Counter-Browser-Extension",
    image: claudeImg,
    icon: "fas fa-puzzle-piece",
    featured: true,
    accentColor: "emerald",
  },
  {
    id: "habit-builder-kit",
    title: "Habit Builder Kit",
    description:
      "A productivity app for building and tracking daily habits. Features streak tracking, progress visualizations, and a reminder system — all offline-first.",
    tags: ["REACT", "REDUX", "TAILWIND"],
    github: "https://github.com/itsrajaniket",
    live: "https://habit-builder-kit.vercel.app/",
    image: habitImg,
    icon: "fas fa-check-circle",
    featured: true,
    accentColor: "cyan",
  },
  {
    id: "markdown-studio",
    title: "Markdown Studio",
    description:
      "A feature-rich React editor with real-time preview, synchronized scrolling, and multi-format export (MD/DOCX). Includes XSS protection and syntax highlighting.",
    tags: ["REACT", "PRISM.JS", "MARKED"],
    github: "https://github.com/itsrajaniket/Your-Markdown-Editor",
    live: "https://markdown-studio-pro.netlify.app/",
    image: markdownImg,
    icon: "fas fa-file-code",
    featured: true,
    accentColor: "indigo",
  },
  {
    id: "beatreactor-synth",
    title: "BeatReactor Synth",
    description:
      "A cyberpunk music station with a dual-sound engine, real-time keyboard mapping, and built-in recording using the Web Audio API.",
    tags: ["WEB AUDIO API", "JS ES6+", "NEON UI"],
    github: "https://github.com/itsrajaniket/BeatReactor",
    live: "https://itsrajaniket.github.io/BeatReactor/",
    image: beatreactorImg,
    icon: "fas fa-compact-disc",
    featured: true,
    accentColor: "purple",
  },
  {
    id: "corporate-job-tracker",
    title: "Corporate Job Tracker",
    description:
      "A Kanban-style job application tracker with drag-and-drop columns, deadline alerts, company notes, and CSV export.",
    tags: ["REACT", "DND-KIT", "TAILWIND"],
    github: "https://github.com/itsrajaniket",
    live: "https://corporate-job-tracker.vercel.app/",
    image: jobtrackerImg,
    icon: "fas fa-briefcase",
    featured: true,
    accentColor: "violet",
  },
  {
    id: "maharani-food-plaza",
    title: "Maharani Food Plaza",
    description:
      "A freelance restaurant website with GSAP scroll animations, interactive menu, and EmailJS-powered reservation form.",
    tags: ["HTML", "CSS", "JS", "GSAP"],
    github: "https://github.com/itsrajaniket",
    live: "https://itsrajaniket.github.io/freelance-restaurant-app/",
    image: maharaniImg,
    icon: "fas fa-utensils",
    accentColor: "amber",
  },
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "Real-time weather data via OpenWeather API with dynamic backgrounds and smooth animated transitions.",
    tags: ["REST API", "JS"],
    github: "https://github.com/itsrajaniket/Weather-App",
    live: "https://itsrajaniket.github.io/Weather-App/",
    image: weatherImg,
    icon: "fas fa-cloud-sun",
    accentColor: "sky",
  },
  {
    id: "text-to-speech",
    title: "Text-to-Speech",
    description:
      "An accessibility tool converting text to natural-sounding speech using the browser Web Speech API.",
    tags: ["WEB SPEECH API", "JS"],
    github: "https://github.com/itsrajaniket/Text-to-Speech-Converter",
    live: "https://itsrajaniket.github.io/Text-to-Speech-Converter/",
    image: speechImg,
    icon: "fas fa-volume-up",
    accentColor: "teal",
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description:
      "Instantly generates scannable QR codes for any URL or text with download support and a clean UI.",
    tags: ["JS", "CANVAS API", "HTML"],
    github: "https://github.com/itsrajaniket/QR-Code-Generator",
    live: "https://itsrajaniket.github.io/QR-Code-Generator/",
    image: qrImg,
    icon: "fas fa-qrcode",
    accentColor: "green",
  },
  {
    id: "dog-api-gallery",
    title: "Dog API Gallery",
    description:
      "Fetches random dog images and breed info using async JavaScript — a clean demo of REST API consumption.",
    tags: ["FETCH API", "JSON", "JS"],
    github: "https://github.com/itsrajaniket/dog-api-project",
    live: "https://itsrajaniket.github.io/dog-api-project/",
    image: dogImg,
    icon: "fas fa-dog",
    accentColor: "orange",
  },
];
