"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface PdfViewerProps {
  url: string;
  title: string;
  fileSize?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title, fileSize }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [securityAlert, setSecurityAlert] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "300px" });

  // 1. Intercept Security Shortcuts (Ctrl+P, Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
        e.preventDefault();
        setSecurityAlert(true);
        setTimeout(() => setSecurityAlert(false), 3000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent right-click on the container
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecurityAlert(true);
    setTimeout(() => setSecurityAlert(false), 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-[1/1.4] relative mb-12 group selection:bg-transparent" 
      onContextMenu={handleContextMenu}
    >
      {/* Visual Glitch/Glow Borders */}
      <div className="absolute -inset-1 blur-sm bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full h-full bg-black/90 rounded-xl border border-accent/20 p-1 md:p-2 shadow-[0_0_40px_rgba(var(--accent),0.1)] overflow-hidden">
        
        {/* Cyberpunk Loading Skeleton */}
        {(!isLoaded || !isInView) && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 p-6 text-center">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-2 border-accent/20 rounded-full" />
              <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" />
              <div className="absolute inset-4 border border-accent/40 rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                <p className="text-accent text-sm tracking-[0.2em] uppercase">Decrypting Document</p>
              </div>
              {fileSize && (
                <p className="text-main/40 text-[10px] tracking-widest">
                  SIZE: {fileSize} | BITRATE: 2.4GBPS
                </p>
              )}
              <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Overlay - Blocks all click interactions with the PDF renderer */}
        <div 
          className="absolute inset-0 z-30 cursor-default" 
          onClick={() => {
            setSecurityAlert(true);
            setTimeout(() => setSecurityAlert(false), 3000);
          }}
        />

        {/* Security Banner */}
        {securityAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-red-500/90 text-white px-4 py-2 rounded font-mono text-[10px] uppercase tracking-tighter border border-white/20 shadow-xl backdrop-blur-md"
          >
            <span className="flex items-center gap-2">
              <i className="fas fa-shield-alt animate-pulse" />
              Security Protocol: Interaction Restricted
            </span>
          </motion.div>
        )}

        {/* The Actual PDF - Only rendered when in view */}
        {isInView && (
          <object
            data={`${url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            type="application/pdf"
            className={`w-full h-full rounded-lg transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onLoad={() => setIsLoaded(true)}
            title={title}
          >
            {/* Fallback for browsers that don't support objects/PDFs */}
            <div className="flex flex-col items-center justify-center h-full text-main/60 p-8 text-center bg-black/40 backdrop-blur-sm rounded-lg border border-white/5">
              <div className="mb-4 text-accent/50">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-main font-bold mb-2 uppercase tracking-widest text-sm">Viewer Protocol Failure</h3>
              <p className="text-xs mb-6 max-w-xs mx-auto leading-relaxed">
                Native PDF rendering is restricted or unsupported by your terminal hardware. Document access requires Chrome, Safari, or Edge.
              </p>
              <div className="px-4 py-2 border border-accent/30 text-accent text-[10px] uppercase tracking-tighter bg-accent/5 rounded font-mono">
                Error Ref: #NULL_RENDERER_0x12F
              </div>
            </div>
          </object>
        )}
      </div>

      {/* Footer Meta */}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-main/40 px-2 font-mono uppercase tracking-widest">
        <div className="flex items-center gap-3 italic">
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isLoaded ? 'bg-accent shadow-[0_0_5px_rgba(var(--accent),0.5)]' : 'bg-red-500'} animate-pulse`} />
            {`System: PDF_RENDERER_v2.0 [${isLoaded ? 'ACTIVE' : 'READY'}]`}
          </span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="hidden sm:inline">User: ANIKET_RAJ</span>
        </div>
        <div className="text-accent/30 flex items-center gap-4">
          <span>{fileSize || "SCANNING..."}</span>
          <span className="hidden sm:inline underline decoration-accent/10">UNAUTHORIZED_ACCESS_IS_LOGGED</span>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PdfViewer;
