import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-static";

// ── Static params ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ── Dynamic metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = getPostBySlug(slug);
  if (!result) return { title: "Post Not Found" };

  const { post } = result;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : [{ url: "/og-image.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

// ── Page component ────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getPostBySlug(slug);
  if (!result) notFound();

  const { post, content } = result;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-main/80 hover:text-accent transition-colors mb-10"
          >
            <i className="fas fa-arrow-left text-xs" aria-hidden="true" />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-main mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-main/70 mb-10 pb-8 border-b border-surfaceBorder/10">
            <span className="flex items-center gap-1.5">
              <i className="fas fa-calendar-alt text-accent" aria-hidden="true" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fas fa-clock text-accent" aria-hidden="true" />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fas fa-user text-accent" aria-hidden="true" />
              Aniket Raj
            </span>
          </div>

          {/* Content */}
          {/* TODO: For full MDX (React components inside posts), install next-mdx-remote:
              npm install next-mdx-remote
              Then replace dangerouslySetInnerHTML with <MDXRemote source={content} />
          */}
          <div
            className="prose-dark max-w-none leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: mdToHtml(content) }}
          />

          {/* Footer CTA */}
          <div className="mt-16 pt-8 border-t border-surfaceBorder/10">
            <div className="glass rounded-2xl p-6 border border-accent/20 text-center">
              <p className="text-muted mb-4">
                Enjoyed this post? Let&apos;s connect and talk frontend!
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-inverseText font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                Get in Touch
                <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

// ── Minimal Markdown → HTML (replace with next-mdx-remote for production) ─
// ── Markdown → HTML Parser (Fixed for hydration & truncation) ──────────
function mdToHtml(md: string): string {
  // 0. Escape raw HTML tags to prevent them from being parsed (e.g., <script>)
  let processedMd = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 1. Initial global replacements for inline stuff
  let html = processedMd
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-main font-bold\">$1</strong>")
    .replace(/\*(.+?)\*/g, "<em class=\"text-main/90 italic\">$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"bg-primary/15 text-accent px-1.5 py-0.5 rounded text-sm font-mono\">$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\" class=\"text-accent hover:underline\">$1</a>");

  // 2. Global replacements for block-level markers
  html = html
    .replace(/^### (.+)$/gm, "<h3 class=\"text-xl font-bold text-main mt-8 mb-3\">$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class=\"text-2xl font-bold text-main mt-10 mb-4\">$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class=\"text-3xl font-bold text-main mt-12 mb-6\">$1</h1>")
    .replace(/^---$/gm, "<hr class=\"border-surfaceBorder/10 my-8\" />")
    .replace(/^> (.+)$/gm, "<blockquote class=\"border-l-4 border-accent bg-accent/5 p-4 my-6 italic text-main/80 rounded-r-lg\">$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li class=\"ml-6 list-disc text-main/90\">$1</li>");

  // 3. Wrap lists
  html = html.replace(/(<li[\s\S]*?<\/li>\n?)+/g, "<ul class=\"space-y-2 my-4\">$&</ul>");

  // 4. Wrap code blocks
  html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, "<pre class=\"bg-card/50 p-4 rounded-xl border border-surfaceBorder/10 overflow-x-auto my-6\"><code class=\"text-sm font-mono text-main/90\">$1</code></pre>");

  // 5. Wrap remaining text in paragraphs, skipping blocks that already have block tags
  return html
    .split(/\n\n+/)
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // If it starts with a block tag, don't wrap in <p>
      if (/^<(h1|h2|h3|ul|li|pre|hr|blockquote)/.test(trimmed)) {
        return trimmed;
      }
      return `<p class="text-main/90 leading-relaxed my-4">${trimmed.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");
}
