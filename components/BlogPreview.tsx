// Server Component — reads blog posts at build/request time
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import SectionReveal from "./SectionReveal";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3); // show latest 3

  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="pt-8 pb-20 lg:pb-28 relative overflow-hidden bg-[#060c18]"
      aria-label="Latest Blog Posts"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <SectionReveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
              07. Writing
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              From the{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blog
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 glass border border-white/10
                       text-slate-300 hover:text-accent hover:border-accent/40
                       font-bold text-sm rounded-xl transition-all shrink-0"
          >
            All Posts
            <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
          </Link>
        </SectionReveal>

        {/* Post cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <SectionReveal key={post.slug} delay={idx * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block glass rounded-2xl p-6 border border-white/10
                           hover:border-accent/40 hover:-translate-y-1
                           transition-all duration-300 h-full"
                aria-label={`Read: ${post.title}`}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 leading-snug
                               group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-calendar-alt text-accent/60" aria-hidden="true" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-clock text-accent/60" aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>
                  <span className="text-accent group-hover:translate-x-1 transition-transform inline-block font-bold">
                    Read →
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
