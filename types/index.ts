// ── Core Data Types ──────────────────────────────────────────────────────────

import { StaticImageData } from "next/image";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github?: string;
  live?: string;
  image: string | StaticImageData;
  icon: string;
  featured?: boolean;
  accentColor?: string;
}

export interface SkillItem {
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  borderHover: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  type: "work" | "study" | "sabbatical";
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  badge: string;
  accentColor: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  accentColor: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  type?: "mdx" | "pdf";
  pdfUrl?: string;
  fileSize?: string;
}
