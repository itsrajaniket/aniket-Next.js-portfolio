"use client";

import { useScrolled } from "@/hooks";

export default function ScrollToTop() {
  const visible = useScrolled(500);

  if (!visible) return null;

  return (
    //     <button
    //       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    //       // className="fixed bottom-8 right-8 bg-accent text-dark p-4 rounded-full z-50
    //       //            shadow-[0_0_20px_rgba(34,211,238,0.6)]
    //       //            hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]
    //       //            transition-all duration-200 animate-fade-in"
    //       className="
    //   fixed bottom-8 right-8 
    //   bg-accent text-dark 
    //   p-4 rounded-full 
    //   z-50 shadow-lg 
    //   transition-transform duration-300 ease-out 
    //   hover:scale-110 hover:shadow-xl 
    //   animate-fade-in
    // "
    //       aria-label="Scroll back to top of page"
    //     >
    //       <i className="fas fa-arrow-up text-xl font-bold" aria-hidden="true" />
    //     </button>
    //   <button
    //     onClick={() =>
    //       window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //       })
    //     }
    //     className="
    //   fixed bottom-6 right-6
    //   bg-white text-gray-700
    //   border border-gray-300
    //   shadow-md
    //   rounded-full
    //   p-3
    //   transition-all duration-300 ease-out
    //   hover:bg-gray-100 hover:shadow-lg hover:text-black
    //   flex items-center justify-center
    // "
    //     aria-label="Back to top"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-6 w-6"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //       strokeWidth={2}
    //     >
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    //     </svg>
    //   </button>
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="
    fixed bottom-8 right-8
    bg-white text-gray-700
    border border-gray-300
    p-4 rounded-full
    z-50 shadow-md
    transition-all duration-300 ease-out
    hover:bg-gray-100 hover:shadow-lg hover:text-black
    flex items-center justify-center
  "
      aria-label="Scroll back to top of page"
    >
      <i className="fas fa-arrow-up text-lg" aria-hidden="true" />
    </button>

  );
}
