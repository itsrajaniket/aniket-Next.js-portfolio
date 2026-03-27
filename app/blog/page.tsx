import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
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
              The Blog
            </h1>
            <p className="text-main/80 text-lg">
              Thoughts on React, performance, Next.js migrations, and building things on the web.
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
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                    {/* Title */}
                    <h2 className="text-xl font-bold text-main mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    {/* Description */}
                    <p className="text-main/80 text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-main/70 font-medium">
                      <span>
                        <i className="fas fa-calendar-alt mr-1.5" aria-hidden="true" />
                        {post.date}
                      </span>
                      <span>
                        <i className="fas fa-clock mr-1.5" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                      <span className="ml-auto text-accent group-hover:translate-x-1 transition-transform inline-block">
                        Read more →
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
