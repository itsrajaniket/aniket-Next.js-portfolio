import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on React, Next.js, frontend engineering, and building great web experiences.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
              Writing
            </span>
            <h1 className="text-5xl font-bold text-main mb-4 font-display">
              The Journal
            </h1>
            <p className="text-main/80 text-lg">
              Technical deep dives, interview prep guides, and case studies from the engineering frontlines.
            </p>
            <div className="w-16 h-1 bg-accent rounded-full mt-6" />
          </div>

          {/* Post list */}
          {posts.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center border border-surfaceBorder/10">
              <i className="fas fa-pen-nib text-accent text-4xl mb-4 block" aria-hidden="true" />
              <h2 className="text-xl font-bold text-main mb-2">First post coming soon</h2>
              <p className="text-main/70">Working on some great content about React and Next.js.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group glass rounded-2xl p-7 border border-surfaceBorder/10 hover:border-accent/40 transition-all hover:-translate-y-1"
                >
                  <Link href={post.slug} className="block">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tech-tag text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-accent border-accent/20 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-main mb-3 group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </h2>
                    {/* Description */}
                    <p className="text-main/70 text-base leading-relaxed mb-6 line-clamp-2">
                      {post.description}
                    </p>
                    {/* Meta */}
                    <div className="flex items-center gap-6 text-xs text-main/50 font-medium pt-4 border-t border-surfaceBorder/5">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-calendar-alt text-accent/60" aria-hidden="true" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="fas fa-clock text-accent/60" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                      <span className="ml-auto text-accent font-bold group-hover:translate-x-1 transition-transform">
                        Read Story →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
