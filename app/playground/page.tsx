import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PlaygroundContent from "@/components/game/PlaygroundContent";

export const metadata = {
  title: "Playground | Arcade & Mini-Games",
  description: "A collection of fun mini-games built with React and Next.js by Aniket Raj.",
};

export default function PlaygroundPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-background flex flex-col relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <PlaygroundContent />
      </main>
      <Footer />
    </>
  );
}
