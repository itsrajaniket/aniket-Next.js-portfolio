"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("menu-open");
  }, []);

  const toggle = useCallback(() => {
    const next = !isOpen;
    setIsOpen(next);
    document.body.classList.toggle("menu-open", next);
  }, [isOpen]);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      close();
      if (!isHomePage) {
        e.preventDefault();
        router.push(`/${href}`);
      }
    },
    [isHomePage, close, router]
  );

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="text-main focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark rounded p-1"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-2xl`} aria-hidden="true" />
      </button>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="navigation"
        aria-label="Mobile navigation"
        className={`
          absolute top-full left-0 w-full glass border-t border-surfaceBorder/10
          py-6 px-6 flex flex-col space-y-4 transition-all duration-300 origin-top
          ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"}
        `}
      >
        {NAV_ITEMS.map(({ label, href, isRoute }) =>
          isRoute ? (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="text-lg font-medium text-accent hover:text-accent/80 transition-colors py-1 flex items-center gap-2"
            >
              <i className="fas fa-pen-nib text-sm" aria-hidden="true" />
              {label}
            </Link>
          ) : (
            <a
              key={href}
              href={isHomePage ? href : `/${href}`}
              onClick={(e) => handleAnchorClick(e, href)}
              className="text-lg font-medium text-main hover:text-accent transition-colors py-1"
            >
              {label}
            </a>
          )
        )}

        <a
          href="/Aniket_Raj_Resume.pdf"
          download="Aniket_Raj_Resume.pdf"
          onClick={close}
          className="mt-2 text-lg font-bold text-accent border border-accent/30 p-3 rounded-xl text-center hover:bg-accent hover:text-inverseText transition-colors"
          aria-label="Download Resume PDF"
        >
          Download Resume <i className="fas fa-download ml-2" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
