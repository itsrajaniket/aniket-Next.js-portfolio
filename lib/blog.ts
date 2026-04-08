import fs from "fs";
import path from "path";
import type { BlogPost } from "@/types";

const PDF_DIR = path.join(process.cwd(), "public/content/pdfs");
const CONTENT_DIR = path.join(process.cwd(), "content/blog");

// ── Helper: Format Byte Size ──────────────────────────────────────────────
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// ── Helper: Slugify ──────────────────────────────────────────────────────
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(".pdf", "")
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, "");    // Remove leading/trailing hyphens
}

// ── Read frontmatter from MDX file ────────────────────────────────────────
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

// ── Get all posts (list page) ─────────────────────────────────────────────
export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  // 1. Load MDX posts
  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
    files.forEach((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = parseFrontmatter(raw);
      const slug = file.replace(".mdx", "");

      posts.push({
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        readingTime: data.readingTime ?? "5 min read",
        tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [],
        coverImage: data.coverImage,
        type: "mdx",
      });
    });
  }

  // 2. Load PDF posts
  if (fs.existsSync(PDF_DIR)) {
    const files = fs.readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
    files.forEach((file) => {
      const stats = fs.statSync(path.join(PDF_DIR, file));
      const slug = slugify(file);
      
      // Basic human-readable title from filename
      const title = file
        .replace(".pdf", "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      posts.push({
        slug,
        title,
        description: `Technical Document: ${title}`,
        date: stats.mtime.toISOString().split("T")[0],
        readingTime: "PDF Document",
        tags: ["PDF", "Documentation"],
        type: "pdf",
        pdfUrl: `/content/pdfs/${encodeURIComponent(file)}`,
        fileSize: formatBytes(stats.size),
      });
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ── Get single post by slug ───────────────────────────────────────────────
export function getPostBySlug(slug: string): { post: BlogPost; content: string } | null {
  // Check MDX first
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = parseFrontmatter(raw);
    const post: BlogPost = {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      readingTime: data.readingTime ?? "5 min read",
      tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [],
      coverImage: data.coverImage,
      type: "mdx"
    };
    return { post, content };
  }

  // Check PDF
  if (fs.existsSync(PDF_DIR)) {
    const pdfs = fs.readdirSync(PDF_DIR);
    const match = pdfs.find(p => slugify(p) === slug);
    if (match) {
      const stats = fs.statSync(path.join(PDF_DIR, match));
      const title = match.replace(".pdf", "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const post: BlogPost = {
        slug,
        title,
        description: `Technical Document: ${title}`,
        date: stats.mtime.toISOString().split("T")[0],
        readingTime: "PDF Document",
        tags: ["PDF", "Documentation"],
        type: "pdf",
        pdfUrl: `/content/pdfs/${encodeURIComponent(match)}`,
        fileSize: formatBytes(stats.size),
      };
      return { post, content: "" };
    }
  }

  return null;
}

// ── Get all slugs for generateStaticParams ────────────────────────────────
export function getAllSlugs(): string[] {
  return getAllPosts().map(p => p.slug);
}

// ── Get Related Posts (Previous/Next) ────────────────────────────────────
export function getRelatedPosts(currentSlug: string): { prev?: BlogPost; next?: BlogPost } {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) return {};

  return {
    prev: allPosts[currentIndex + 1],
    next: allPosts[currentIndex - 1],
  };
}
