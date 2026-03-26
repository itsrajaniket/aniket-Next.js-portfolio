// Server Component
import { education } from "@/lib/experience";
import SectionReveal from "@/components/animations/SectionReveal";
import AnimatedTitle from "@/components/animations/AnimatedTitle";

const ACCENT: Record<string, { bar: string; period: string; badge: string }> = {
  green:   { bar: "bg-green-500",   period: "text-green-400",   badge: "bg-green-500/10 border-green-500/20 text-green-300" },
  amber:   { bar: "bg-amber-500",   period: "text-amber-400",   badge: "bg-amber-500/10 border-amber-500/20 text-amber-300" },
  cyan:    { bar: "bg-cyan-500",    period: "text-cyan-400",    badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" },
  purple:  { bar: "bg-purple-500",  period: "text-purple-400",  badge: "bg-purple-500/10 border-purple-500/20 text-purple-300" },
  blue:    { bar: "bg-blue-500",    period: "text-blue-400",    badge: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
  emerald: { bar: "bg-emerald-500", period: "text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
};

export default function Education() {
  return (
    <section
      id="education"
      className="pt-8 pb-20 lg:pb-28 bg-section-education relative overflow-hidden"
      aria-label="Education background"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
            06. Education
          </span>
          <AnimatedTitle 
            text1="Education &" 
            text2="Background" 
            className="mb-4 justify-center" 
          />
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6" />
        </SectionReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((item, idx) => {
            const colors = ACCENT[item.accentColor] ?? ACCENT.cyan;
            return (
              <SectionReveal key={item.period} delay={idx * 0.1}>
                <div
                  className={`relative group h-full bg-card/60 backdrop-blur-md p-5 pt-6 rounded-xl border border-slate-800 hover:-translate-y-1 hover:border-${item.accentColor}-500/50 transition-all duration-300 shadow-lg flex flex-col`}
                >
                  {/* Animated top accent bar */}
                  <div className={`absolute top-0 left-4 w-12 h-1 ${colors.bar} rounded-b-md z-10 group-hover:w-full transition-all duration-500`} />

                  <span className={`${colors.period} font-mono text-xs tracking-widest font-bold mb-1 uppercase`}>
                    {item.period}
                  </span>
                  <h3 className="text-base font-bold text-main leading-tight mb-1">
                    {item.degree}
                  </h3>
                  <p className="text-muted text-xs mt-1 mb-3 flex-grow leading-relaxed">
                    {item.institution}
                  </p>
                  <span className={`inline-flex w-max items-center px-2 py-0.5 rounded border ${colors.badge} font-bold text-xs`}>
                    {item.badge}
                  </span>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
