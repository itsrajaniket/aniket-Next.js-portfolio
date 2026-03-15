"use client";

import { useScrolled } from "@/hooks";

export default function ScrollToTop() {
  const visible = useScrolled(500);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      // className="fixed bottom-8 right-8 bg-accent text-dark p-4 rounded-full z-50
      //            shadow-[0_0_20px_rgba(34,211,238,0.6)]
      //            hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]
      //            transition-all duration-200 animate-fade-in"
      className="
  fixed bottom-8 right-8 
  bg-accent text-dark 
  p-4 rounded-full 
  z-50 shadow-lg 
  transition-transform duration-300 ease-out 
  hover:scale-110 hover:shadow-xl 
  animate-fade-in
"
      aria-label="Scroll back to top of page"
    >
      <i className="fas fa-arrow-up text-xl font-bold" aria-hidden="true" />
    </button>
  );
}
