"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={copy}
      className={`px-3 py-1.5 text-xs font-bold rounded border transition-all shrink-0 ${
        copied
          ? "bg-green-500 border-green-500 text-main"
          : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-main"
      }`}
      aria-label={copied ? "Copied!" : `Copy ${value} to clipboard`}
    >
      {copied ? "COPIED!" : "COPY"}
    </button>
  );
}
