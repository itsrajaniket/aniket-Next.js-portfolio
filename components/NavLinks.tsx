"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useActiveSection } from "@/hooks";
import { NAV_ITEMS, NAV_SECTION_IDS } from "@/lib/constants";

interface NavLinksProps {
  onLinkClick?: () => void;
  className?: string;
}

export default function NavLinks({ onLinkClick, className = "" }: NavLinksProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const activeSection = useActiveSection([...NAV_SECTION_IDS]);

  // When clicking an anchor link from a non-home page:
  // Navigate to "/#section" — Next.js goes to home, browser scrolls to hash
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    onLinkClick?.();
    if (!isHomePage) {
      e.preventDefault();
      // Navigate to home with the hash — browser handles the scroll
      router.push(`/${href}`);
    }
    // On home page: let native anchor scroll work normally
  };

  return (
    <ul className={`flex items-center gap-8 ${className}`} role="list">
      {NAV_ITEMS.map(({ label, href, isRoute }) => {
        const isActive = isHomePage && !isRoute && activeSection === href.replace("#", "");

        return (
          <li key={href}>
            {isRoute ? (
              <Link
                href={href}
                onClick={onLinkClick}
                className="nav-link font-medium transition-colors hover:text-accent text-slate-300 flex items-center gap-1.5"
              >
                {label}
                <i className="fas fa-pen-nib text-xs text-accent opacity-70" aria-hidden="true" />
              </Link>
            ) : (
              <a
                href={isHomePage ? href : `/${href}`}
                onClick={(e) => handleAnchorClick(e, href)}
                className={`nav-link font-medium transition-colors hover:text-accent ${
                  isActive ? "nav-active" : "text-slate-300"
                }`}
              >
                {label}
              </a>
            )}
          </li>
        );
      })}

      <li>
        <a
          href="/Aniket_Raj_Resume.pdf"
          download="Aniket_Raj_Resume.pdf"
          className="px-5 py-1.5 border border-accent text-accent rounded-full font-bold text-sm
                     hover:bg-accent hover:text-dark transition-all
                     shadow-[0_0_10px_rgba(34,211,238,0.2)]
                     hover:shadow-[0_0_25px_rgba(34,211,238,0.7)]"
          aria-label="Download Aniket Raj's Resume PDF"
        >
          Resume <i className="fas fa-download ml-1" aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}
