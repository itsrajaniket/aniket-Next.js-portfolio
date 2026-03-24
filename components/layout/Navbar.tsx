// Server Component — no "use client"
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <nav
      className="fixed w-full z-40 transition-all duration-300"
      id="navbar"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg shadow-black/5">

          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-black font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            aria-label="Aniket Raj — Go to top"
          >
            ANIKET.
          </a>

          {/* Desktop nav — Client Component (needs usePathname) */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          {/* Mobile hamburger — Client Component (needs useState) */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
