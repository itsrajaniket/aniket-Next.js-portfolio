// Server Component
import ContactForm from "@/components/shared/ContactForm";
import SectionReveal from "@/components/animations/SectionReveal";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import CopyButton from "@/components/ui/CopyButton";
import { SOCIAL_LINKS, AUTHOR_EMAIL, AUTHOR_LOCATION } from "@/lib/constants";

export default function Contact() {
  return (
    <section
      id="contact"
      className="pt-8 pb-20 lg:pb-28 relative overflow-hidden bg-section-contact"
      aria-label="Contact Aniket Raj"
    >
      {/* Ambient blobs */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] top-1/4 left-1/4 pointer-events-none -z-10" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] bottom-1/4 right-1/4 pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <SectionReveal className="mb-12">
          <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
            08. Contact
          </span>
          <AnimatedTitle 
            text1="Get" 
            text2="In Touch" 
            className="mb-4" 
          />
          <p className="text-muted max-w-xl">
            Open to full-time roles, freelance projects, and interesting collabs.
            Pick any channel below — I respond fast.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-6" />
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: Contact Form ─────────────────────────────────────── */}
          <SectionReveal delay={0.1}>
            <ContactForm />
          </SectionReveal>

          {/* ── Right: Info Panel ──────────────────────────────────────── */}
          <SectionReveal delay={0.2} className="space-y-6">

            {/* Availability badge */}
            <div className="bg-card/50 rounded-2xl p-6 border border-surfaceBorder/10 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse inline-block" />
                <span className="text-green-400 text-sm font-bold tracking-wide uppercase">
                  Available for Work
                </span>
              </div>
              <h3 className="text-xl font-bold text-main mb-2">
                Let&apos;s Build Something Great
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Whether it&apos;s a full-time React role, a freelance project, or just a quick
                coffee chat about frontend engineering — my inbox is always open.
              </p>

              {/* Quick-access email + location */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <i className="fas fa-envelope text-accent w-4" aria-hidden="true" />
                  <a
                    href={`mailto:${AUTHOR_EMAIL}`}
                    className="text-muted hover:text-accent transition-colors font-medium"
                  >
                    {AUTHOR_EMAIL}
                  </a>
                  <CopyButton value={AUTHOR_EMAIL} />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <i className="fas fa-map-marker-alt text-accent w-4" aria-hidden="true" />
                  <span className="text-muted">{AUTHOR_LOCATION}</span>
                </div>
              </div>
            </div>

            {/* Social links grid — all 6 */}
            <div>
              <p className="text-xs text-muted font-bold uppercase tracking-widest mb-3">
                Find me on
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_LINKS.filter((s) => s.href !== `mailto:${AUTHOR_EMAIL}`).map(
                  ({ icon, href, label, handle, color, bg }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border ${bg} hover:scale-[1.03] transition-all group`}
                      aria-label={label}
                    >
                      <i className={`${icon} ${color} text-lg w-5 text-center shrink-0`} aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted font-bold uppercase tracking-wider leading-none mb-0.5">
                          {label.replace(" Profile", "")}
                        </p>
                        <p className={`text-sm font-semibold ${color} truncate`}>
                          {handle}
                        </p>
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>

          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
