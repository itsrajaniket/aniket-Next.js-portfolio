import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { getProjectCaseStudy, getAllProjectIds } from "@/lib/projects-content";
import { mdToHtml } from "@/lib/markdown";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import CodeHighlighter from "@/components/blog/CodeHighlighter";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = getProjectCaseStudy(id);
  if (!result) return { title: "Project Not Found" };

  return {
    title: `${result.project.title} | Case Study`,
    description: result.project.description,
    openGraph: {
      images: [{ url: typeof result.project.image === 'string' ? result.project.image : (result.project.image as StaticImageData).src }],
    }
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getProjectCaseStudy(id);

  if (!result) notFound();

  const { project, content, data } = result;

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <CodeHighlighter />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Back Link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-12 group"
          >
            <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Projects
          </Link>

          {/* Header Section - Centered */}
          <div className="text-center mb-16">
            <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
              Project Case Study
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-main leading-tight mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              {project.description}
            </p>

            {/* Meta Bar - Horizontal & Centered */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-surfaceBorder/10">
              <div className="text-left">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">Timeline</h3>
                <p className="text-main font-medium">{data.date || "2026"}</p>
              </div>
              <div className="text-left">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">Role</h3>
                <p className="text-main font-medium">Lead Developer</p>
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass w-12 h-12 rounded-full border border-surfaceBorder/10 flex items-center justify-center text-main hover:border-accent hover:text-accent transition-all"
                    title="Source Code"
                  >
                    <i className="fa-brands fa-github text-xl" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-inverseText w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform glow-shadow"
                    title="Live Demo"
                  >
                    <i className="fas fa-external-link-alt" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden mb-20 border border-surfaceBorder/10 shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>

          {/* Main Content - Centered Single Column */}
          <div className="max-w-3xl mx-auto">
             {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {project.tags.map(tag => (
                <span key={tag} className="tech-tag text-xs py-1.5 px-4">{tag}</span>
              ))}
            </div>

            <article className="prose-dark max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: mdToHtml(content) }}
              />

              {/* Bottom CTA */}
              <div className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-br from-accent/15 via-primary/5 to-transparent border border-accent/20 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-3xl font-bold text-main mb-4">Interested in this project?</h3>
                <p className="text-muted mb-10 max-w-md mx-auto text-lg leading-relaxed">
                  I&apos;m always open to discussing technical implementations or potential collaborations.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                   <Link
                    href="/#contact"
                    className="px-10 py-5 bg-accent text-inverseText font-bold rounded-2xl hover:scale-105 transition-transform glow-shadow text-lg"
                  >
                    Start a Conversation
                  </Link>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 glass border border-surfaceBorder/10 text-main font-bold rounded-2xl hover:border-accent transition-all text-lg"
                  >
                    View Codebase
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
