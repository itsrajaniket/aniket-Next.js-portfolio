"use client";

import { useState, useEffect, useRef } from "react";
import { TYPEWRITER_WORDS } from "@/lib/constants";

export default function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[wordIndex];

    const schedule = (delay: number, fn: () => void) => {
      timeoutRef.current = setTimeout(fn, delay);
    };

    if (!deleting) {
      if (charIndex < word.length) {
        schedule(60, () => setCharIndex((c) => c + 1));
      } else {
        schedule(1800, () => setDeleting(true));
      }
    } else {
      if (charIndex > 0) {
        schedule(35, () => setCharIndex((c) => c - 1));
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % TYPEWRITER_WORDS.length);
      }
    }

    setDisplayed(word.substring(0, charIndex));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, deleting, wordIndex]);

  return (
    <span aria-live="polite" aria-atomic="true">
      <span className="text-accent">{displayed}</span>
      <span className="cursor-blink text-accent ml-0.5" aria-hidden="true">|</span>
    </span>
  );
}
