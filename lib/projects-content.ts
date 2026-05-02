import fs from "fs";
import path from "path";
import { projects } from "./projects";
import type { Project } from "@/types";

const PROJECTS_CONTENT_DIR = path.join(process.cwd(), "project_readme");

export interface ProjectCaseStudy {
  project: Project;
  content: string;
  data: Record<string, string>;
}

// ── Read frontmatter from MD file ────────────────────────────────────────
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = raw.match(fmRegex);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) data[key.trim()] = rest.join(":").trim().replace(/^["']|["']$/g, "");
  });

  return { data, content: match[2] };
}

export function getProjectCaseStudy(id: string): ProjectCaseStudy | null {
  const project = projects.find((p) => p.id === id);
  if (!project) return null;

  // We now expect the filename to match the project ID exactly
  const filePath = path.join(PROJECTS_CONTENT_DIR, `${id}.md`);
  
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = parseFrontmatter(raw);
    return { project, content, data };
  }

  return null;
}

export function getAllProjectIds(): string[] {
  if (!fs.existsSync(PROJECTS_CONTENT_DIR)) return [];
  return projects
    .filter(p => fs.existsSync(path.join(PROJECTS_CONTENT_DIR, `${p.id}.md`)))
    .map(p => p.id);
}
