"use client";

import React from "react";

interface PdfViewerProps {
  url: string;
  title: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title }) => {
  // Prevent right-click on the container
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full aspect-[1/1.4] relative mb-12 group" onContextMenu={handleContextMenu}>
      {/* Visual Glitch/Glow Borders */}
      <div className="absolute -inset-1 blur-sm bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30 rounded-xl" />
      
      <div className="relative w-full h-full bg-black/80 rounded-xl border border-accent/30 p-1 md:p-2 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        <object
          data={`${url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          type="application/pdf"
          className="w-full h-full rounded-lg"
        >
          <div className="flex items-center justify-center h-full text-main/60">
            PDF Viewer not supported in this browser.
          </div>
        </object>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-main/60 px-2 italic uppercase tracking-tighter">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          // Secure Document Viewer v1.2 [READ-ONLY]
        </span>
        <span className="text-accent/40 hidden md:block">
          UNAUTHORIZED DISTRIBUTION PROHIBITED
        </span>
      </div>

      {/* CSS to attempt to hide some print/save features in some browsers */}
      <style jsx>{`
        @media print {
          body { display: none; }
        }
      `}</style>
    </div>
  );
};

export default PdfViewer;
