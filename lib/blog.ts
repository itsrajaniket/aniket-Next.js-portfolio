import fs from "fs";
import path from "path";
import type { BlogPost } from "@/types";
import { projects } from "./projects";

const PDF_DIR = path.join(process.cwd(), "public/content/pdfs");
const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const PROJECTS_DIR = path.join(process.cwd(), "project_readme");

// ── Simple Dev Cache ──────────────────────────────────────────────────────
let cachedPosts: BlogPost[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5000;

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(".pdf", "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Human Readable Date Formatter ─────────────────────────────────────────
export function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
}

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

export function getAllPosts(): BlogPost[] {
  const now = Date.now();
  if (cachedPosts && (now - lastCacheTime < CACHE_DURATION)) {
    return cachedPosts;
  }

  const posts: BlogPost[] = [];

  // 1. Load MDX Blog Posts
  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
    files.forEach((file) => {
      try {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
        const { data } = parseFrontmatter(raw);
        const slug = file.replace(".mdx", "");

        posts.push({
          slug: `/blog/${slug}`,
          title: data.title ?? slug,
          description: data.description ?? "Deep dive into modern web development and architectural patterns.",
          date: data.date ?? "2026-05-01",
          readingTime: data.readingTime ?? "5 min read",
          tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()) : ["Engineering"],
          coverImage: data.coverImage,
          type: "mdx",
        });
      } catch (e) {
        console.error(`Error reading blog post ${file}:`, e);
      }
    });
  }

  // 2. Load Project Readmes as Blog Posts
  if (fs.existsSync(PROJECTS_DIR)) {
    projects.forEach((project) => {
      if (project.hasCaseStudy) {
        posts.push({
          slug: `/projects/${project.id}`,
          title: project.title,
          description: project.description,
          date: "2026-05-01",
          readingTime: "Case Study",
          tags: ["Case Study", ...project.tags.slice(0, 1)],
          coverImage: project.image,
          type: "mdx",
        });
      }
    });
  }

  // 3. Load PDF posts
  if (fs.existsSync(PDF_DIR)) {
    const files = fs.readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
    files.forEach((file) => {
      try {
        const stats = fs.statSync(path.join(PDF_DIR, file));
        const slug = slugify(file);
        
        // Custom logic for professional labels based on filenames
        let title = file.replace(".pdf", "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        let description = "A comprehensive technical guide for frontend and backend mastery.";
        let tags = ["Deep Dive", "Guide"];

        if (title.toLowerCase().includes("interview") || title.toLowerCase().includes("knows")) {
          tags = ["Interview Prep", "Senior Level"];
          description = "Master common technical interview patterns and architecture decisions.";
        } else if (title.toLowerCase().includes("react")) {
          tags = ["React", "Performance"];
          description = "Advanced patterns for scaling high-performance React applications.";
        }

        posts.push({
          slug: `/blog/${slug}`,
          title,
          description,
          date: stats.mtime.toISOString().split("T")[0],
          readingTime: "Technical Guide",
          tags,
          type: "pdf",
          pdfUrl: `/content/pdfs/${encodeURIComponent(file)}`,
          fileSize: formatBytes(stats.size),
        });
      } catch (e) {
        console.error(`Error reading PDF ${file}:`, e);
      }
    });
  }

  const sorted = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  cachedPosts = sorted;
  lastCacheTime = now;
  return sorted;
}

export function getPostBySlug(slug: string): { post: BlogPost; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = parseFrontmatter(raw);
    const post: BlogPost = {
      slug: `/blog/${slug}`,
      title: data.title ?? slug,
      description: data.description ?? "Deep dive into modern web development.",
      date: data.date ?? "2026-05-01",
      readingTime: data.readingTime ?? "5 min read",
      tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()) : ["Engineering"],
      coverImage: data.coverImage,
      type: "mdx"
    };
    return { post, content };
  }

  if (fs.existsSync(PDF_DIR)) {
    const pdfs = fs.readdirSync(PDF_DIR);
    const match = pdfs.find(p => slugify(p) === slug);
    if (match) {
      const stats = fs.statSync(path.join(PDF_DIR, match));
      const title = match.replace(".pdf", "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const post: BlogPost = {
        slug: `/blog/${slug}`,
        title,
        description: `Comprehensive guide for ${title}.`,
        date: stats.mtime.toISOString().split("T")[0],
        readingTime: "Technical Guide",
        tags: ["Deep Dive"],
        type: "pdf",
        pdfUrl: `/content/pdfs/${encodeURIComponent(match)}`,
        fileSize: formatBytes(stats.size),
      };
      return { post, content: "" };
    }
  }

  return null;
}

export function getAllSlugs(): string[] {
  const posts: string[] = [];
  if (fs.existsSync(CONTENT_DIR)) {
    posts.push(...fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith(".mdx")).map(f => f.replace(".mdx", "")));
  }
  if (fs.existsSync(PDF_DIR)) {
    posts.push(...fs.readdirSync(PDF_DIR).filter(f => f.toLowerCase().endsWith(".pdf")).map(f => slugify(f)));
  }
  return posts;
}

export function getRelatedPosts(currentSlug: string): { prev?: BlogPost; next?: BlogPost } {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug.includes(currentSlug));

  if (currentIndex === -1) return {};

  return {
    prev: allPosts[currentIndex + 1],
    next: allPosts[currentIndex - 1],
  };
}
