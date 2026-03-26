// Server Component
import Link from "next/link";
import { SOCIAL_LINKS, NAV_ITEMS, AUTHOR_NAME } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-surfaceBorder/5 bg-base" aria-label="Site footer">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand */}
          <a
            href="#home"
            className="flex items-center pl-3 border-l-2 border-accent hover:border-primary transition-colors duration-300"
            aria-label="Go to top"
          >
            <span className="text-sm font-medium tracking-[0.18em] uppercase text-main/90 hover:text-main transition-colors duration-300">
              Aniket.
            </span>
          </a>

          {/* Quick nav — renders anchors or Link based on isRoute */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
              {NAV_ITEMS.filter((_, i) => i > 0).map(({ label, href, isRoute }) => (
                <li key={href}>
                  {isRoute ? (
                    <Link href={href} className="text-sm text-muted hover:text-accent transition-colors">
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="text-sm text-muted hover:text-accent transition-colors">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`w-9 h-9 glass rounded-lg flex items-center justify-center ${color} border border-surfaceBorder/5 hover:border-accent/50 hover:scale-110 transition-all`}
                aria-label={label}
              >
                <i className={`${icon} text-sm`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surfaceBorder/5 text-center">
          <p className="text-muted text-sm">
            Built with ❤️ by{" "}
            <span className="text-accent font-semibold">{AUTHOR_NAME}</span>{" "}
            using Next.js 15, Tailwind CSS &amp; Framer Motion &copy; {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
