// Server Component — SpiderCanvas and Typewriter are Client Components
import Image from "next/image";
import SpiderCanvas from "@/components/visuals/SpiderCanvas";
import Typewriter from "@/components/animations/Typewriter";
import { HERO_STATS, AUTHOR_LOCATION } from "@/lib/constants";
import headImg from "@/public/images/head.png";
import avatarImg from "@/public/images/3D-avatar.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={headImg}
          alt="Cyberpunk background"
          placeholder="blur"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/95 via-base/90 to-base" />
      </div>

      {/* Spider-network particle canvas */}
      <SpiderCanvas />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] glow-effect pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[120px] glow-effect pointer-events-none" />

      {/* Main content grid */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* ── Left: text block ─────────────────────────────────────────── */}
        <div className="text-left space-y-6">
          <a
            href="#contact"
            className="inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/5
                       text-accent text-sm font-mono mb-2 hover:bg-accent/10 transition-colors"
          >
            Available for Full Time Work ↗
          </a>

          {/* <h1 className="text-5xl md:text-8xl font-black tracking-tight font-display">
            ANIKET <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              RAJ
            </span> */}
          {/* </h1> */}
          {<h1 className="text-5xl md:text-8xl font-black tracking-tight font-display leading-[0.93]">
            <span className="text-main">ANIKET</span>
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(167,139,250,0.3)" }}
            >
              RAJ
            </span>
          </h1>}

          <h2 className="text-2xl md:text-4xl font-bold text-muted">
            I am a <Typewriter />
          </h2>

          <p className="text-muted text-lg max-w-lg leading-relaxed">
            Specializing in building high-performance{" "}
            <span className="text-accent italic font-medium">React ecosystems</span>{" "}
            and optimizing complex algorithms. Based in India.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-inverseBase text-inverseText font-bold rounded-xl
                         hover:bg-accent hover:scale-105 transition-all shadow-lg shadow-surfaceBorder/5"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 glass border border-surfaceBorder/10 text-main font-bold rounded-xl
                         hover:border-accent hover:text-accent hover:bg-accent/5 transition-all"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

        {/* ── Right: avatar card ───────────────────────────────────────── */}
        <div className="hidden md:flex justify-center relative">
          <div className="animate-float glass p-5 rounded-3xl border border-surfaceBorder/10 w-80 relative">

            {/* Floating React icon badge */}
            <div className="absolute -top-6 -right-6 w-20 h-20 glass rounded-2xl flex items-center justify-center border border-surfaceBorder/20 shadow-xl z-10">
              <i className="fab fa-react text-4xl text-cyan-400 animate-spin-slow" aria-hidden="true" />
            </div>

            {/* Avatar */}
            <div className="rounded-2xl overflow-hidden border border-surfaceBorder/10 mb-5 relative group">
              <Image
                src={avatarImg}
                alt="Aniket Raj 3D Avatar"
                placeholder="blur"
                className="w-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent opacity-60" />
            </div>

            {/* Location + Status bar */}
            <div className="pt-4 border-t border-surfaceBorder/10 flex justify-between items-center mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted font-bold">Location</p>
                <p className="text-sm font-medium">{AUTHOR_LOCATION.split(",")[0]}, India</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-muted font-bold">Status</p>
                <p className="text-sm font-medium text-green-400 flex items-center gap-1 justify-end">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                  Open to work
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "fas fa-code", color: "text-cyan-400", label: "Projects", value: HERO_STATS[0].value },
                { icon: "fab fa-github", color: "text-purple-400", label: "Repos", value: HERO_STATS[1].value },
                { icon: "fas fa-star", color: "text-yellow-400", label: "Year", value: "2025" },
              ].map(({ icon, color, label, value }) => (
                <div key={label} className="bg-card/40 p-2 rounded-xl text-center border border-surfaceBorder/5 backdrop-blur-sm will-change-transform">
                  <i className={`${icon} ${color} text-sm mb-1 block`} aria-hidden="true" />
                  <p className="text-xs text-muted uppercase tracking-wider font-bold">{label}</p>
                  <p className="text-base font-bold text-main">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60 pointer-events-none">
        <span className="text-xs text-muted font-mono tracking-widest uppercase">Scroll</span>
        <i className="fas fa-chevron-down text-accent text-sm" aria-hidden="true" />
      </div>
    </section>
  );
}
