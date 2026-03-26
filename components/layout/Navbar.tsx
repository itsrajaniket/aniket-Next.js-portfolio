// Server Component — no "use client"
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  return (
    <nav
      className="fixed w-full z-40 transition-all duration-300"
      id="navbar"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-6 py-2">
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl px-6 py-2 flex justify-between items-center shadow-lg shadow-black/5 border border-surfaceBorder/10">

          {/* Logo */}
          {/* <a
            href="#home"
            className="text-xl font-black font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            aria-label="Aniket Raj — Go to top"
          >
            ANIKET.
          </a> */}
          {<a
            href="#home"
            className="flex items-center pl-3 border-l-2 border-accent hover:border-primary transition-colors duration-300"
            aria-label="Aniket Raj — Go to top"
          >
            <span className="text-sm font-medium tracking-[0.18em] uppercase text-main/90 hover:text-main transition-colors duration-300">
              Aniket.
            </span>
          </a>}
          {/* Desktop nav — Client Component (needs usePathname) */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Mobile hamburger — Client Component (needs useState) */}
            <MobileNav />
          </div>
        </div>
      </div>
    </nav >
  );
}
