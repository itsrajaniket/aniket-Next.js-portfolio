import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog | Aniket Raj — Full-Stack & AI Dev",
  description:
    "Technical deep dives on React, Next.js, AI/GenAI integration, and full-stack MERN development by Aniket Raj.",
  keywords: [
    "React",
    "Next.js",
    "MERN",
    "AI",
    "GenAI",
    "Full Stack",
    "Aniket Raj",
    "JavaScript",
    "Node.js",
  ],
  authors: [{ name: "Aniket Raj", url: "https://rajaniket.com" }],
  alternates: {
    canonical: "https://rajaniket.com/blog",
  },
  openGraph: {
    title: "Blog | Aniket Raj — Full-Stack & AI Dev",
    description:
      "Technical deep dives on React, Next.js, AI/GenAI integration, and full-stack MERN development.",
    url: "https://rajaniket.com/blog",
    siteName: "Aniket Raj",
    images: [
      {
        url: "https://rajaniket.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aniket Raj — Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Aniket Raj",
    description:
      "Technical deep dives on React, Next.js, AI/GenAI integration, and full-stack MERN development.",
    images: ["https://rajaniket.com/og-image.png"],
  },
};

// JSON-LD structured data for Google
function BlogJsonLd({ postCount }: { postCount: number }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Aniket Raj — Blog",
    description:
      "Technical articles on React, Next.js, AI/GenAI, and full-stack MERN development.",
    url: "https://rajaniket.com/blog",
    author: {
      "@type": "Person",
      name: "Aniket Raj",
      url: "https://rajaniket.com",
    },
    numberOfItems: postCount,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />

      <BlogJsonLd postCount={posts.length} />

      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <header className="mb-16">
            <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
              Writing
            </span>
            <h1 className="text-5xl font-bold text-main mb-4 font-display">
              Blog
            </h1>
            <p className="text-main/70 text-lg max-w-xl leading-relaxed">
              Technical deep dives, AI integration guides, and real-world case
              studies from building full-stack apps.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-16 h-1 bg-accent rounded-full" />
              {posts.length > 0 && (
                <span className="text-main/40 text-sm font-mono">
                  {posts.length} {posts.length === 1 ? "post" : "posts"}
                </span>
              )}
            </div>
          </header>

          {/* Posts */}
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

type Post = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: string;
};

function PostCard({ post, index }: { post: Post; index: number }) {
  const isFirst = index === 0;

  return (
    <article
      className={`group glass rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5
        ${isFirst
          ? "p-8 border-accent/20 bg-accent/[0.03]"
          : "p-7 border-surfaceBorder/10 hover:border-accent/30"
        }`}
    >
      <Link href={post.slug} className="block" aria-label={`Read: ${post.title}`}>

        {/* Featured badge for latest */}
        {isFirst && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-accent text-white px-3 py-1 rounded-full">
              Latest
            </span>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" aria-label="Tags">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="tech-tag text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          className={`font-bold text-main mb-3 group-hover:text-accent transition-colors leading-tight
            ${isFirst ? "text-3xl" : "text-2xl"}`}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-main/60 text-base leading-relaxed mb-6 line-clamp-2">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-6 text-xs text-main/40 font-medium pt-4 border-t border-surfaceBorder/5">
          <time
            dateTime={post.date}
            className="flex items-center gap-2"
          >
            <i className="fas fa-calendar-alt text-accent/50" aria-hidden="true" />
            {formatDate(post.date)}
          </time>
          <span className="flex items-center gap-2">
            <i className="fas fa-clock text-accent/50" aria-hidden="true" />
            {post.readingTime}
          </span>
          <span className="ml-auto text-accent font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Read <span aria-hidden="true">→</span>
          </span>
        </div>

      </Link>
    </article>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="glass rounded-2xl p-12 text-center border border-surfaceBorder/10">
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
        <i className="fas fa-pen-nib text-accent text-2xl" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-bold text-main mb-2">First post dropping soon</h2>
      <p className="text-main/50 text-sm max-w-xs mx-auto leading-relaxed">
        Writing about React, Next.js, AI integration, and things I learn building real projects.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-6 text-accent text-sm font-semibold hover:underline"
      >
        ← Back to portfolio
      </Link>
    </div>
  );
}