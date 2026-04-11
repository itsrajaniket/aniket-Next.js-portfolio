"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { NAV_ITEMS } from "@/lib/constants";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Escape key & scroll lock cleanup
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) close(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <div className="lg:hidden h-9 flex items-center">
      {/* Trigger Button - Now correctly aligned in Navbar flow */}
      <button
        onClick={toggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="text-main focus:outline-none p-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl transition-all duration-300 ${isOpen ? "rotate-90 text-accent" : ""}`} aria-hidden="true" />
      </button>

      {/* Navigation Overlay & Menu - Rendered via Portal for zero clipping */}
      {mounted && createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Backdrop Overlay - Standard semi-transparent dim */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
              />

              {/* Menu Panel - Theme Aware & Opaque */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-screen w-[85%] max-w-[320px] z-[9999] bg-base shadow-2xl flex flex-col border-l border-surfaceBorder/10"
              >
                <div className="flex-1 flex flex-col p-8 pt-24 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col space-y-4">
                    {NAV_ITEMS.map(({ label, href, isRoute }, i) => (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        {isRoute ? (
                          <Link
                            href={href}
                            onClick={close}
                            className="text-xl font-bold text-main hover:text-accent transition-colors flex items-center gap-4 group"
                          >
                             <span className="text-accent text-[10px] font-mono opacity-50 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">0{i+1}</span>
                            {label}
                          </Link>
                        ) : (
                          <a
                            href={isHomePage ? href : `/${href}`}
                            onClick={(e) => handleAnchorClick(e, href)}
                            className="text-xl font-bold text-main hover:text-accent transition-colors flex items-center gap-4 group"
                          >
                            <span className="text-accent text-[10px] font-mono opacity-50 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">0{i+1}</span>
                            {label}
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    className="mt-12 pt-8 border-t border-surfaceBorder/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <a
                      href="/Aniket_Raj_Resume.pdf"
                      download="Aniket_Raj_Resume.pdf"
                      onClick={close}
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-accent text-inverseText font-black text-lg shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Download CV <i className="fas fa-download text-sm" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
