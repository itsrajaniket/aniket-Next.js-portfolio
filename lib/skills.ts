import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Core",
    icon: "fas fa-code",
    skills: [
      {
        name: "JavaScript",
        subtitle: "ES6+ & Async",
        icon: "fa-brands fa-js",
        color: "text-yellow-400",
        borderHover: "hover:border-yellow-400/50",
      },
      {
        name: "TypeScript",
        subtitle: "Strict Typing",
        icon: "fas fa-code",
        color: "text-blue-400",
        borderHover: "hover:border-blue-400/50",
      },
      {
        name: "HTML & CSS",
        subtitle: "Semantic",
        icon: "fa-brands fa-html5",
        color: "text-orange-500",
        borderHover: "hover:border-orange-500/50",
      },
      {
        name: "Java",
        subtitle: "OOP Logic",
        icon: "fa-brands fa-java",
        color: "text-red-500",
        borderHover: "hover:border-red-500/50",
      },
      {
        name: "Python",
        subtitle: "Scripting",
        icon: "fa-brands fa-python",
        color: "text-yellow-300",
        borderHover: "hover:border-yellow-300/50",
      },
    ],
  },
  {
    title: "Frameworks",
    icon: "fas fa-layer-group",
    skills: [
      {
        name: "React.js",
        subtitle: "Ecosystem Expert",
        icon: "fa-brands fa-react",
        color: "text-cyan-400",
        borderHover: "hover:border-cyan-400/50",
      },
      {
        name: "Next.js",
        subtitle: "App Router",
        icon: "fas fa-n",
        color: "text-white",
        borderHover: "hover:border-white/50",
      },
      {
        name: "Redux Toolkit",
        subtitle: "State Mgmt",
        icon: "fas fa-atom",
        color: "text-purple-400",
        borderHover: "hover:border-purple-400/50",
      },
      {
        name: "Tailwind CSS",
        subtitle: "Utility First",
        icon: "fas fa-wind",
        color: "text-teal-400",
        borderHover: "hover:border-teal-400/50",
      },
      {
        name: "Framer Motion",
        subtitle: "Animations",
        icon: "fas fa-film",
        color: "text-pink-400",
        borderHover: "hover:border-pink-400/50",
      },
    ],
  },
  {
    title: "Tools",
    icon: "fas fa-tools",
    skills: [
      {
        name: "Git & GitHub",
        subtitle: "Version Control",
        icon: "fa-brands fa-git-alt",
        color: "text-orange-400",
        borderHover: "hover:border-orange-400/50",
      },
      {
        name: "VS Code",
        subtitle: "Primary IDE",
        icon: "fas fa-laptop-code",
        color: "text-blue-500",
        borderHover: "hover:border-blue-500/50",
      },
      {
        name: "Figma",
        subtitle: "UI Design",
        icon: "fa-brands fa-figma",
        color: "text-purple-300",
        borderHover: "hover:border-purple-300/50",
      },
      {
        name: "Vite",
        subtitle: "Build Tool",
        icon: "fas fa-bolt",
        color: "text-yellow-400",
        borderHover: "hover:border-yellow-400/50",
      },
      {
        name: "REST APIs",
        subtitle: "Integration",
        icon: "fas fa-plug",
        color: "text-green-400",
        borderHover: "hover:border-green-400/50",
      },
    ],
  },
];
