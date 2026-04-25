"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import MemoryGame with ssr: false to avoid hydration mismatches
// and to ensure game logic (like random shuffling) happens only on the client.
const MemoryGame = dynamic(() => import("@/components/game/MemoryGame"), {
  loading: () => (
    <div className="h-[600px] flex items-center justify-center bg-card/20 rounded-3xl border border-white/5">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Initializing Game Engine...</p>
      </div>
    </div>
  ),
  ssr: false,
});

export default function PlaygroundContent() {
  return (
    <div className="container mx-auto px-6 relative z-10 flex-grow">
      {/* Header Section */}
      <div className="text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-4">
          Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Playground</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Welcome to the arcade! Here you'll find a collection of mini-games I've built to experiment with React state, logic, and animations. More games coming soon!
        </p>
      </div>

      {/* Game Section */}
      <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-10 shadow-xl mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold font-display flex items-center gap-3">
              <i className="fas fa-brain text-primary"></i> Tech Stack Memory
            </h2>
            <p className="text-muted-foreground mt-2">Test your memory by matching the technology icons.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">React</span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full border border-secondary/20">Framer Motion</span>
          </div>
        </div>

        {/* Memory Game component */}
        <div className="-mt-10 min-h-[600px]">
          <MemoryGame />
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card/20 border border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-2xl text-muted-foreground">
            <i className="fas fa-keyboard"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Beat the Dev (Tic-Tac-Toe)</h3>
          <p className="text-sm text-muted-foreground">Coming Soon. Play an impossible game of Tic-Tac-Toe against my AI logic.</p>
        </div>
        
        <div className="bg-card/20 border border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-2xl text-muted-foreground">
            <i className="fas fa-stopwatch"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Dev Typing Test</h3>
          <p className="text-sm text-muted-foreground">Coming Soon. Type code snippets as fast as you can to test your WPM.</p>
        </div>
        
        <div className="bg-card/20 border border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity md:col-span-2 lg:col-span-1">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-2xl text-muted-foreground">
            <i className="fas fa-ghost"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Classic Snake</h3>
          <p className="text-sm text-muted-foreground">Coming Soon. Eat the tech stack logos to grow your snake.</p>
        </div>
      </div>
    </div>
  );
}
