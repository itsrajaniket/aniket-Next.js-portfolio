"use client";

import React from "react";
import { motion } from "framer-motion";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useScrollDirection, useScrolled } from "@/hooks";

export default function Navbar() {
  const scrollDir = useScrollDirection();
  const isScrolled = useScrolled(50); // Small threshold for initial state

  // We hide the navbar only if we've scrolled down AND we've moved past the hero area
  // This ensures the navbar is always visible at the very top.
  const isHidden = scrollDir === "down" && isScrolled;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed w-full z-40 transition-all duration-300"
      id="navbar"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-6 py-2">
        <div className={`
          bg-card/70 backdrop-blur-md rounded-2xl px-6 py-2 flex justify-between items-center 
          shadow-lg shadow-black/5 border border-surfaceBorder/10
          ${isScrolled ? "bg-card/80 shadow-xl" : ""}
        `}>

          {/* Logo */}
          <a
            href="/#home"
            className="flex items-center pl-3 border-l-2 border-accent hover:border-primary transition-colors duration-300"
            aria-label="Aniket Raj — Go to top"
          >
            <span className="text-sm font-medium tracking-[0.18em] uppercase text-main/90 hover:text-main transition-colors duration-300">
              Aniket.
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
