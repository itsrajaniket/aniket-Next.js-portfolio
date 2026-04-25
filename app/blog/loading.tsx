"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-16">
          <div className="w-24 h-4 bg-accent/20 rounded-full animate-pulse mb-4" />
          <div className="w-64 h-12 bg-white/5 rounded-xl animate-pulse mb-4" />
          <div className="w-full h-6 bg-white/5 rounded-lg animate-pulse" />
          <div className="w-16 h-1 bg-accent/30 rounded-full mt-6" />
        </div>

        {/* Post Skeletons */}
        <div className="space-y-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="glass rounded-2xl p-7 border border-surfaceBorder/5"
            >
              <div className="flex gap-2 mb-4">
                <div className="w-16 h-5 bg-white/5 rounded-full animate-pulse" />
                <div className="w-20 h-5 bg-white/5 rounded-full animate-pulse" />
              </div>
              <div className="w-3/4 h-7 bg-white/5 rounded-lg animate-pulse mb-3" />
              <div className="w-full h-4 bg-white/5 rounded-lg animate-pulse mb-2" />
              <div className="w-5/6 h-4 bg-white/5 rounded-lg animate-pulse mb-5" />
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-24 h-4 bg-white/5 rounded-md animate-pulse" />
                  <div className="w-20 h-4 bg-white/5 rounded-md animate-pulse" />
                </div>
                <div className="w-24 h-4 bg-accent/20 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
