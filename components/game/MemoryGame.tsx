"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Icons from lib/skills.ts
const baseCards = [
  { name: "React", icon: "fa-brands fa-react", color: "text-cyan-400" },
  { name: "Next.js", icon: "fas fa-n", color: "text-white" },
  { name: "Node.js", icon: "fa-brands fa-node-js", color: "text-green-500" },
  { name: "TypeScript", icon: "fas fa-file-code", color: "text-blue-400" },
  { name: "Python", icon: "fa-brands fa-python", color: "text-yellow-300" },
  { name: "Tailwind", icon: "fas fa-wind", color: "text-teal-400" },
  { name: "MongoDB", icon: "fas fa-leaf", color: "text-green-600" },
  { name: "GitHub", icon: "fa-brands fa-github", color: "text-white" },
];

interface CardData {
  id: number;
  name: string;
  icon: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const playSound = (type: 'flip' | 'match' | 'error' | 'win') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'flip') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'match') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'win') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.setValueAtTime(500, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(600, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export default function MemoryGame() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Initialize game
  const initializeGame = () => {
    const duplicatedCards = [...baseCards, ...baseCards];
    const shuffledCards = duplicatedCards
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    // Prevent clicking if locked, already flipped, or matched
    if (
      isLocked ||
      cards[index].isFlipped ||
      cards[index].isMatched ||
      flippedIndices.length === 2
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    playSound('flip');

    // Check for match
    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const firstIndex = newFlippedIndices[0];
      const secondIndex = newFlippedIndices[1];

      if (newCards[firstIndex].name === newCards[secondIndex].name) {
        // Match found
        playSound('match');
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setMatches((prev) => prev + 1);
        setIsLocked(false);

        if (matches + 1 === baseCards.length) {
          playSound('win');
          setIsWon(true);
        }
      } else {
        // No match, flip back after delay
        playSound('error');
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Take a Break & <span className="text-primary">Play</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-8"
          >
            Match the tech stack pairs. Moves: <span className="font-bold text-foreground">{moves}</span>
          </motion.p>

          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/20 border border-primary/50 text-primary p-4 rounded-xl mb-8 inline-block"
            >
              <p className="text-xl font-bold">You Won in {moves} moves! 🎉</p>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
            className="px-6 py-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-full font-medium transition-colors border border-border"
          >
            <i className="fas fa-redo mr-2"></i> Restart Game
          </motion.button>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="relative w-full aspect-square [perspective:1000px]"
              onClick={() => handleCardClick(index)}
            >
              <motion.div
                className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer"
                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Front of card (hidden by default) */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-card/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg flex items-center justify-center hover:border-primary/50 transition-colors">
                  <i className="fas fa-question text-xl sm:text-2xl text-muted-foreground/50"></i>
                </div>

                {/* Back of card (the icon) */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-card/90 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.2)] flex items-center justify-center [transform:rotateY(180deg)]">
                  <i className={`${card.icon} text-2xl sm:text-4xl ${card.color}`}></i>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
