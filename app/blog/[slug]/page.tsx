import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import CodeHighlighter from "@/components/blog/CodeHighlighter";
import PdfViewer from "@/components/blog/PdfViewer";

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
  if (post.type === "pdf") {
    console.log(`[DEBUG] Rendering PDF Blog Post: ${post.title}, URL: ${post.pdfUrl}`);
  }

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <CodeHighlighter />
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
          {post.type === "pdf" && post.pdfUrl ? (
            <PdfViewer url={post.pdfUrl} title={post.title} />
          ) : post.type === "pdf" ? (
            <div className="p-8 border border-dashed border-accent/30 rounded-xl text-center text-main/60">
              PDF source not found. Please contact the administrator.
            </div>
          ) : (
            <div
              className="prose-dark max-w-none leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: mdToHtml(content) }}
            />
          )}

          {/* Footer CTA */}
          <div className="mt-16 pt-8 border-t border-surfaceBorder/10">
            {/* Related Posts */}
            {(() => {
              const { prev, next } = getRelatedPosts(slug);
              if (!prev && !next) return null;
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="glass p-6 rounded-2xl border border-surfaceBorder/10 hover:border-accent/40 transition-all group"
                    >
                      <span className="text-xs text-accent uppercase tracking-wider mb-2 block">Previous Post</span>
                      <h4 className="text-main font-bold line-clamp-1 group-hover:text-accent transition-colors">{prev.title}</h4>
                    </Link>
                  ) : <div />}
                  {next ? (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="glass p-6 rounded-2xl border border-surfaceBorder/10 hover:border-accent/40 transition-all text-right group"
                    >
                      <span className="text-xs text-accent uppercase tracking-wider mb-2 block">Next Post</span>
                      <h4 className="text-main font-bold line-clamp-1 group-hover:text-accent transition-colors">{next.title}</h4>
                    </Link>
                  ) : <div />}
                </div>
              );
            })()}

            <div className="glass rounded-2xl p-6 border border-accent/20 text-center">
              <p className="text-muted mb-4">
                Enjoyed this post? Let&apos;s connect and talk frontend!
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-inverseText font-bold rounded-xl hover:scale-105 transition-transform glow-shadow"
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
  // 1. Extract code blocks early to avoid paragraph splitting issues
  const codeBlocks: { lang: string; content: string }[] = [];
  const placeholderMd = md.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, content) => {
    const id = codeBlocks.length;
    codeBlocks.push({ lang: lang || "javascript", content });
    return `\n\nCODEBLOCKPLACEHOLDER${id}\n\n`;
  });

  // 2. Escape raw HTML in the remaining markdown
  const processedMd = placeholderMd
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 3. Inline replacements (Bold, Italic, Link, Inline Code)
  let html = processedMd
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-main font-bold\">$1</strong>")
    // Italic: *text* or _text_
    .replace(/\*([^*]+)\*/g, "<em class=\"text-main/90 italic\">$1</em>")
    .replace(/_([^_]+)_/g, "<em class=\"text-main/90 italic\">$1</em>")
    // Inline Code: `code`
    .replace(/`([^`]+)`/g, "<code class=\"bg-primary/15 text-accent px-1.5 py-0.5 rounded text-sm font-mono\">$1</code>")
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\" class=\"text-accent hover:underline\">$1</a>");

  // 4. Block-level replacements
  html = html
    .replace(/^### (.+)$/gm, "<h3 class=\"text-xl font-bold text-main mt-8 mb-3\">$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class=\"text-2xl font-bold text-main mt-10 mb-4\">$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class=\"text-3xl font-bold text-main mt-12 mb-6\">$1</h1>")
    .replace(/^---$/gm, "<hr class=\"border-surfaceBorder/10 my-8\" />")
    .replace(/^> (.+)$/gm, "<blockquote class=\"border-l-4 border-accent bg-accent/5 p-4 my-6 italic text-main/80 rounded-r-lg\">$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li class=\"ml-6 list-disc text-main/90\">$1</li>");

  // 5. Wrap list items into <ul>
  html = html.replace(/(<li[\s\S]*?<\/li>\n?)+/g, "<ul class=\"space-y-2 my-4\">$&</ul>");

  // 6. Split into blocks and wrap paragraphs, then restore code blocks
  return html
    .split(/\n\n+/)
    .map((block: string) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Restore Code Block if this is a placeholder
      if (trimmed.startsWith("CODEBLOCKPLACEHOLDER")) {
        const idMatch = trimmed.match(/\d+/);
        if (idMatch) {
          const id = parseInt(idMatch[0]);
          const { lang, content } = codeBlocks[id];
          let normalizedLang = lang;
          if (normalizedLang === "js") normalizedLang = "javascript";
          if (normalizedLang === "ts") normalizedLang = "typescript";
          
          // Escape content inside code block
          const escapedContent = content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
          return `<pre class="language-${normalizedLang} bg-card/50 p-4 rounded-xl border border-surfaceBorder/10 overflow-x-auto my-6"><code class="language-${normalizedLang} text-sm font-mono text-main/90">${escapedContent}</code></pre>`;
        }
      }

      // If it's already a block tag, return as is
      if (/^<(h1|h2|h3|ul|li|hr|blockquote|pre)/.test(trimmed)) {
        return trimmed;
      }

      // Otherwise wrap in paragraph
      return `<p class="text-main/90 leading-relaxed my-4">${trimmed.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");
}
