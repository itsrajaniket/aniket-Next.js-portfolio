"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  const styles =
    type === "success"
      ? "bg-green-500/10 border-green-500/20 text-green-300"
      : "bg-red-500/10 border-red-500/20 text-red-300";

  const icon = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl animate-fade-in ${styles}`}
    >
      <i className={icon} aria-hidden="true" />
      <span className="text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <i className="fas fa-times text-xs" aria-hidden="true" />
      </button>
    </div>
  );
}
