import fs from "fs";
import path from "path";
import type { BlogPost } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

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
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = parseFrontmatter(raw);
      const slug = file.replace(".mdx", "");

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        readingTime: data.readingTime ?? "5 min read",
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        coverImage: data.coverImage,
      } satisfies BlogPost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

// ── Get single post by slug ───────────────────────────────────────────────
export function getPostBySlug(slug: string): { post: BlogPost; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  const post: BlogPost = {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    readingTime: data.readingTime ?? "5 min read",
    tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
    coverImage: data.coverImage,
  };

  return { post, content };
}

// ── Get all slugs for generateStaticParams ────────────────────────────────
export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
// ── Get Related Posts (Previous/Next) ────────────────────────────────────
export function getRelatedPosts(currentSlug: string): { prev?: BlogPost; next?: BlogPost } {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) return {};

  return {
    prev: allPosts[currentIndex + 1], // Lower in list = older = previous
    next: allPosts[currentIndex - 1], // Higher in list = newer = next
  };
}
