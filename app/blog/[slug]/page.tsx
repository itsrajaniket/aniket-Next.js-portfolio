import type { Metadata } from "next";
import { StaticImageData } from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, getRelatedPosts, formatDate } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import CodeHighlighter from "@/components/blog/CodeHighlighter";
import PdfViewer from "@/components/blog/PdfViewer";
import { mdToHtml } from "@/lib/markdown";

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
      images: post.coverImage 
        ? [{ url: typeof post.coverImage === 'string' ? post.coverImage : (post.coverImage as StaticImageData).src }] 
        : [{ url: "/og-image.png" }],
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
              {formatDate(post.date)}
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
            <PdfViewer url={post.pdfUrl} title={post.title} fileSize={post.fileSize} />
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
