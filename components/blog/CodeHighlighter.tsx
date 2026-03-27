"use client";

import { useEffect } from "react";
import Prism from "prismjs";

// Include basic languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

export default function CodeHighlighter() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return null;
}
