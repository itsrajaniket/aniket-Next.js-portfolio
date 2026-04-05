// Server Component
import { skillCategories } from "@/lib/skills";
import SectionReveal from "@/components/animations/SectionReveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="pt-8 pb-20 lg:pb-28 bg-section-skills text-muted relative overflow-hidden"
      aria-label="Technical Skills"
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen animate-blob pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-4000 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Sticky label column */}
          <SectionReveal className="lg:col-span-3 lg:sticky lg:top-24">
            <span className="text-accent font-mono tracking-widest uppercase text-sm mb-6 block">
              02. Proficiency
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-main mb-8 tracking-tight leading-none">
              My Tech <br />
              <span className="text-[#64748b]">Arsenal.</span>
            </h2>
            <p className="text-muted text-base leading-relaxed mb-10 max-w-md">
              A focused arsenal of modern tools designed for performance, scalability, and user experience.
            </p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-secondary rounded-full" />
          </SectionReveal>

          {/* Skills grid */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((category, catIdx) => (
              <SectionReveal key={category.title} delay={catIdx * 0.12}>
                <div className="space-y-4">
                  <h3 className="text-main font-bold text-sm uppercase tracking-wider mb-6 border-b border-surfaceBorder/10 pb-3 flex items-center">
                    <i className={`${category.icon} text-accent mr-3`} aria-hidden="true" />
                    {category.title}
                  </h3>
 
                  {category.skills.map((skill, skillIdx) => (
                    <div
                      key={skill.name}
                      className={`group flex items-center p-3.5 bg-card/50 backdrop-blur-sm rounded-xl border border-surfaceBorder/5 ${skill.borderHover} animate-float hover:bg-card/60 transition-all duration-300 will-change-transform`}
                      style={{ animationDelay: `${skillIdx * 0.5}s` }}
                    >
                      <i
                        className={`${skill.icon} text-xl ${skill.color} mr-4 group-hover:scale-110 transition`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <h4 className="text-main text-sm font-semibold truncate">{skill.name}</h4>
                        <p className="text-[10px] text-muted font-medium truncate opacity-70">{skill.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
