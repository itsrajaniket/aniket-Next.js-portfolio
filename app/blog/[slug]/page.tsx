import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <main className="min-h-screen pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors mb-10"
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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 mb-10 pb-8 border-b border-white/10">
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
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="glass rounded-2xl p-6 border border-accent/20 text-center">
              <p className="text-slate-300 mb-4">
                Enjoyed this post? Let&apos;s connect and talk frontend!
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-dark font-bold rounded-xl hover:scale-105 transition-transform"
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
function mdToHtml(md: string): string {
  return md
    // Code blocks (must come before inline code)
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Headings
    .replace(/^### (.+)$/gm, "<h3 class=\"text-xl font-bold text-white mt-8 mb-3\">$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class=\"text-2xl font-bold text-white mt-10 mb-4\">$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class=\"text-3xl font-bold text-white mt-12 mb-6\">$1</h1>")
    // Inline formatting
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-white font-bold\">$1</strong>")
    .replace(/\*(.+?)\*/g, "<em class=\"text-slate-300 italic\">$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"bg-primary/15 text-accent px-1.5 py-0.5 rounded text-sm font-mono\">$1</code>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\" class=\"text-accent hover:underline\">$1</a>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr class=\"border-white/10 my-8\" />")
    // Lists
    .replace(/^- (.+)$/gm, "<li class=\"ml-6 list-disc text-slate-300\">$1</li>")
    .replace(/(<li[\s\S]*?<\/li>\n?)+/g, "<ul class=\"space-y-2 my-4\">$&</ul>")
    // Paragraphs (double newline = paragraph break)
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("<h") || block.startsWith("<ul") || block.startsWith("<pre") || block.startsWith("<hr")) {
        return block;
      }
      const trimmed = block.trim();
      return trimmed ? `<p class="text-slate-400 leading-relaxed my-4">${trimmed.replace(/\n/g, " ")}</p>` : "";
    })
    .join("\n");
}
