// Server Component
import Image from "next/image";
import SectionReveal from "@/components/animations/SectionReveal";
import { HERO_STATS } from "@/lib/constants";

export default function About() {
  return (
    <section
      id="about"
      className="pt-8 pb-20 lg:pb-28 relative overflow-hidden"
      aria-label="About Aniket Raj"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <SectionReveal className="text-center mb-16">
          <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
            01. About
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6" />
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Photo + orbiting icons */}
          <SectionReveal delay={0.1} className="relative flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000" />
              <div className="relative w-64 h-80 md:w-80 md:h-96 bg-slate-800 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/selfphoto.png"
                  alt="Aniket Raj — Frontend Developer"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition duration-500"
                  sizes="(max-width: 768px) 256px, 320px"
                />
                <div className="absolute bottom-4 left-4 right-4 glass p-3 rounded-xl border border-white/10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs font-mono text-accent flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                    const status = &quot;Coding...&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Orbiting tech icons */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 border border-dashed border-accent/20 rounded-full animate-spin-slow" style={{ animationDuration: "12s" }} />
                <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "12s" }}>
                  {[
                    { icon: "fab fa-react",    color: "text-cyan-400",   pos: "top-0 left-1/2 -translate-x-1/2 -mt-4" },
                    { icon: "fab fa-js",       color: "text-yellow-400", pos: "bottom-0 left-1/2 -translate-x-1/2 -mb-4" },
                    { icon: "fab fa-css3-alt", color: "text-blue-500",   pos: "left-0 top-1/2 -translate-y-1/2 -ml-4" },
                    { icon: "fab fa-html5",    color: "text-orange-500", pos: "right-0 top-1/2 -translate-y-1/2 -mr-4" },
                  ].map(({ icon, color, pos }) => (
                    <i key={icon} className={`${icon} ${color} text-3xl absolute ${pos} bg-dark p-2 rounded-lg border border-white/10`} aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right — Text */}
          <SectionReveal delay={0.2} className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              React Developer & Frontend Engineer
            </h3>
            <p className="text-slate-400 leading-relaxed">
              I&apos;m <span className="text-accent font-semibold">Aniket Raj</span>, a self-taught
              React developer based in Indore, India. With a background in Electronics & Communication
              (M.Sc., CGPA 8.81), I bring an analytical mindset to frontend engineering — obsessing
              over performance, clean architecture, and pixel-perfect UIs.
            </p>
            <p className="text-slate-400 leading-relaxed">
              After a focused sabbatical for civil services preparation, I re-entered tech with renewed
              commitment to modern web development. I specialize in the{" "}
              <span className="text-primary font-semibold">React ecosystem</span> — from component
              architecture and Redux Toolkit to Next.js App Router and Framer Motion animations.
            </p>
            <p className="text-slate-400 leading-relaxed">
              When I&apos;m not shipping code, I&apos;m exploring Web Audio APIs, building synths, or
              writing about frontend techniques on my blog.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-dark font-bold rounded-xl hover:scale-105 transition-transform"
              >
                View Projects
              </a>
              <a
                href="/Aniket_Raj_Resume.pdf"
                download="Aniket_Raj_Resume.pdf"
                className="px-6 py-3 glass border border-white/10 text-white font-bold rounded-xl hover:border-accent hover:text-accent transition-all"
                aria-label="Download Aniket Raj Resume PDF"
              >
                <i className="fas fa-download mr-2" aria-hidden="true" />
                Resume
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {HERO_STATS.map(({ value, label }) => (
                <div key={label} className="glass rounded-xl p-4 text-center border border-white/5">
                  <p className="text-2xl font-black font-display text-accent">{value}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
