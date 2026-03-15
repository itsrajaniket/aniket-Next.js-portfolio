// Server Component
import { services } from "@/lib/experience";
import SectionReveal from "./SectionReveal";

const ACCENT_CLASSES: Record<string, { border: string; bg: string; text: string; icon: string; glow: string }> = {
  purple:  { border: "hover:border-purple-500/50",  bg: "bg-purple-500/10",  text: "text-purple-400",  icon: "group-hover:text-purple-300",  glow: "hover:shadow-[0_8px_30px_rgb(168,85,247,0.15)]" },
  pink:    { border: "hover:border-pink-500/50",    bg: "bg-pink-500/10",    text: "text-pink-400",    icon: "group-hover:text-pink-300",    glow: "hover:shadow-[0_8px_30px_rgb(236,72,153,0.15)]" },
  blue:    { border: "hover:border-blue-500/50",    bg: "bg-blue-500/10",    text: "text-blue-400",    icon: "group-hover:text-blue-300",    glow: "hover:shadow-[0_8px_30px_rgb(59,130,246,0.15)]" },
  emerald: { border: "hover:border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-400", icon: "group-hover:text-emerald-300", glow: "hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)]" },
  orange:  { border: "hover:border-orange-500/50",  bg: "bg-orange-500/10",  text: "text-orange-400",  icon: "group-hover:text-orange-300",  glow: "hover:shadow-[0_8px_30px_rgb(249,115,22,0.15)]" },
  teal:    { border: "hover:border-teal-500/50",    bg: "bg-teal-500/10",    text: "text-teal-400",    icon: "group-hover:text-teal-300",    glow: "hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)]" },
};

export default function Services() {
  return (
    <section
      id="services"
      className="pt-8 pb-20 lg:pb-28 relative overflow-hidden bg-[#070e1b]"
      aria-label="Services offered"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a] to-[#070e1b] -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
            05. Services
          </span>
          <h2 className="inline-block text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 pb-2">
            My Expertise
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg mt-4">
            Offering end-to-end web solutions — from pixel-perfect design to robust architecture.
          </p>
        </SectionReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const colors = ACCENT_CLASSES[service.accentColor] ?? ACCENT_CLASSES.purple;
            return (
              <SectionReveal key={service.title} delay={idx * 0.1}>
                <div
                  className={`group relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:-translate-y-2 ${colors.border} transition-all duration-300 cursor-pointer overflow-hidden shadow-lg ${colors.glow} h-full`}
                >
                  {/* Hover tint */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-${service.accentColor}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    {/* Icon box */}
                    <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-4 ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                      </svg>
                    </div>

                    <h3 className={`text-xl font-bold text-white mb-2 ${colors.icon} transition-colors`}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
