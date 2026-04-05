// Server Component
import Image from "next/image";
import SectionReveal from "@/components/animations/SectionReveal";
import SpotlightText from "@/components/animations/SpotlightText";
import SpotlightReveal from "@/components/animations/SpotlightReveal";

const ABOUT_STATS = [
  { value: "15+", label: "Projects", sub: "shipped" },
  { value: "8.81", label: "CGPA", sub: "M.Sc." },
  { value: "3", label: "Years", sub: "UPSC discipline" },
  { value: "Now", label: "Status", sub: "Open to work" },
];

const TRAITS = [
  "Performance-obsessed",
  "Systems thinker",
  "Clean architecture",
  "React ecosystem",
  "Always learning",
];

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

      {/* Large decorative letter */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-black text-white/[0.015] select-none pointer-events-none leading-none hidden lg:block"
        aria-hidden="true"
      >
        A
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section label */}
        <SectionReveal className="mb-12">
          <span className="text-accent font-mono tracking-widest uppercase text-xs">
            01. About
          </span>
        </SectionReveal>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
          {/* ── LEFT: Photo card (Appears first on mobile too if desired, or use order-2 on mobile) ── */}
          <SectionReveal delay={0.25} className="relative lg:sticky lg:top-24 order-2 lg:order-1">

            {/* Offset accent border */}
            <div
              className="absolute -top-3 -right-3 w-full h-full rounded-2xl border border-accent/20 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative group rounded-2xl overflow-hidden border border-surfaceBorder/10 bg-card/50 backdrop-blur-md">

              {/* Photo */}
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/selfphoto.png"
                  alt="Aniket Raj — Frontend Developer"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition duration-700"
                  sizes="(max-width: 1024px) 100vw, 300px"
                />
                {/* Fade bottom */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Card footer */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-main">Aniket Raj</p>
                    <p className="text-xs text-muted">React Developer · Indore, India</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                    Open to work
                  </span>
                </div>

                <div className="border-t border-surfaceBorder/10" />

                {/* Quick facts grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    { k: "Stack", v: "React · Next.js" },
                    { k: "Focus", v: "Frontend eng." },
                    { k: "Available", v: "Immediately" },
                    { k: "Mode", v: "Remote / On-site" },
                  ].map(({ k, v }) => (
                    <div key={k}>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                        {k}
                      </span>
                      <span className="text-xs text-main font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orbiting icons — scaled down, bottom-left corner */}
            <div
              className="absolute -bottom-6 -left-6 pointer-events-none"
              aria-hidden="true"
            >
              <div className="relative w-28 h-28">
                <div
                  className="absolute inset-0 border border-dashed border-accent/20 rounded-full animate-spin-slow"
                  style={{ animationDuration: "12s" }}
                />
                <div
                  className="absolute inset-0 animate-spin-slow"
                  style={{ animationDuration: "12s" }}
                >
                  {[
                    { icon: "fab fa-react", color: "text-accent", pos: "top-0 left-1/2 -translate-x-1/2 -mt-3" },
                    { icon: "fab fa-js", color: "text-yellow-400", pos: "bottom-0 left-1/2 -translate-x-1/2 -mb-3" },
                    { icon: "fab fa-css3-alt", color: "text-blue-500", pos: "left-0 top-1/2 -translate-y-1/2 -ml-3" },
                    { icon: "fab fa-html5", color: "text-orange-500", pos: "right-0 top-1/2 -translate-y-1/2 -mr-3" },
                  ].map(({ icon, color, pos }) => (
                    <i
                      key={icon}
                      className={`${icon} ${color} text-base absolute ${pos} bg-base p-1.5 rounded-md border border-surfaceBorder/10`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* ── RIGHT: Text content ── */}
          <SectionReveal delay={0.1} className="space-y-8 order-1 lg:order-2">

            {/* Headline */}
            <SpotlightText
              text1="I build interfaces"
              text2="people actually enjoy."
              sizeClassName="text-3xl md:text-4xl lg:text-5xl"
            />

            {/* Trait pills */}
            <div className="flex flex-wrap gap-2">
              {TRAITS.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-accent/20 text-accent/70 bg-accent/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bio with Spotlight Reveal */}
            <SpotlightReveal spotlightSize={250}>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  I&apos;m <span className="text-main font-semibold">Aniket Raj</span> — a
                  self-taught React developer from Indore, India. My M.Sc. in Electronics &amp;
                  Communication (CGPA 8.81) gave me an analytical, systems-first mindset that I
                  now bring to every line of frontend code.
                </p>
                <p>
                  From 2021–2024 I stepped away from tech to prepare seriously for the UPSC civil
                  services exams. That pause taught me depth, discipline, and how to learn hard
                  things from scratch. When I returned to code, I came back{" "}
                  <span className="text-primary font-semibold">more structured than ever.</span>
                </p>
                <p>
                  I care about performance you can measure, code a teammate can read six months
                  later, and UIs that feel fast and right. Outside work I&apos;m tinkering with
                  Web Audio synthesis in React and writing about what I learn, because
                  explaining something is the best test of whether I actually understand it.
                </p>
              </div>
            </SpotlightReveal>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 bg-accent text-inverseText font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-[0_0_20px_rgba(var(--accent),0.2)]"
              >
                View Projects
              </a>
              <a
                href="/Aniket_Raj_Resume.pdf"
                download="Aniket_Raj_Resume.pdf"
                className="px-6 py-3 glass border border-surfaceBorder/10 text-main font-bold rounded-xl hover:border-accent hover:text-accent transition-all text-sm"
                aria-label="Download Aniket Raj Resume PDF"
              >
                <i className="fas fa-download mr-2" aria-hidden="true" />
                Resume
              </a>
            </div>

            {/* Stats — borderline row */}
            <div className="grid grid-cols-4 gap-3 pt-2 border-t border-surfaceBorder/10">
              {ABOUT_STATS.map(({ value, label, sub }) => (
                <div key={label} className="pt-5">
                  <p className="text-2xl lg:text-3xl font-black font-display text-accent leading-none">
                    {value}
                  </p>
                  <p className="text-xs font-semibold text-main mt-1">{label}</p>
                  <p className="text-xs text-muted">{sub}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}