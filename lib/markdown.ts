/**
 * Minimal Markdown → HTML Parser
 * Designed for high-performance rendering of README files and blog posts.
 */
export function mdToHtml(md: string): string {
  // 1. Extract code blocks early to avoid paragraph splitting issues
  const codeBlocks: { lang: string; content: string }[] = [];
  const placeholderMd = md.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, content) => {
    const id = codeBlocks.length;
    codeBlocks.push({ lang: lang || "javascript", content });
    return `\n\nCODEBLOCKPLACEHOLDER${id}\n\n`;
  });

  // 2. Escape raw HTML in the remaining markdown
  const processedMd = placeholderMd
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 3. Inline replacements (Bold, Italic, Link, Inline Code)
  let html = processedMd
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-main font-bold\">$1</strong>")
    // Italic: *text* or _text_
    .replace(/\*([^*]+)\*/g, "<em class=\"text-main/90 italic\">$1</em>")
    .replace(/_([^_]+)_/g, "<em class=\"text-main/90 italic\">$1</em>")
    // Inline Code: `code`
    .replace(/`([^`]+)`/g, "<code class=\"bg-primary/15 text-accent px-1.5 py-0.5 rounded text-sm font-mono\">$1</code>")
    // Images: ![alt](url)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      const isBadge = url.includes("img.shields.io") || url.includes("badge");
      return `<img src="${url}" alt="${alt}" class="${isBadge ? "inline-block mr-1 my-1" : "rounded-xl my-8 border border-surfaceBorder/10 max-w-full"}" />`;
    })
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent hover:underline\">$1</a>");

  // 4. Block-level replacements
  html = html
    .replace(/^### (.+)$/gm, "<h3 class=\"text-xl font-bold text-main mt-8 mb-3\">$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class=\"text-2xl font-bold text-main mt-10 mb-4\">$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class=\"text-3xl font-bold text-main mt-12 mb-6\">$1</h1>")
    .replace(/^---$/gm, "<hr class=\"border-surfaceBorder/10 my-8\" />")
    .replace(/^> (.+)$/gm, "<blockquote class=\"border-l-4 border-accent bg-accent/5 p-4 my-6 italic text-main/80 rounded-r-lg\">$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li class=\"ml-6 list-disc text-main/90\">$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li class=\"ml-6 list-decimal text-main/90\">$1</li>");

  // 4.1 Tables (Simple implementation)
  const lines = html.split("\n");
  const processedLines: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      // Skip the separator row | :--- | ---: |
      if (line.includes("---")) continue;
      
      const cells = line.split("|").filter(c => c.trim() !== "" || (line.startsWith("|") && line.endsWith("|") && line.split("|").length > 2));
      // Handle the case where split might leave empty first/last elements
      const actualCells = line.split("|").slice(1, -1).map(c => c.trim());
      
      const tag = tableRows.length === 0 ? "th" : "td";
      const row = `<tr>${actualCells.map(c => `<${tag} class="border border-surfaceBorder/10 px-4 py-2 text-left">${c}</${tag}>`).join("")}</tr>`;
      tableRows.push(row);
    } else {
      if (inTable) {
        processedLines.push(`<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-surfaceBorder/10 rounded-xl overflow-hidden">${tableRows.join("")}</table></div>`);
        inTable = false;
      }
      processedLines.push(lines[i]);
    }
  }
  if (inTable) {
    processedLines.push(`<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-surfaceBorder/10 rounded-xl overflow-hidden">${tableRows.join("")}</table></div>`);
  }
  html = processedLines.join("\n");

  // 5. Wrap list items into <ul> or <ol>
  html = html.replace(/(<li class="ml-6 list-disc text-main\/90">[\s\S]*?<\/li>\n?)+/g, "<ul class=\"space-y-2 my-4\">$&</ul>");
  html = html.replace(/(<li class="ml-6 list-decimal text-main\/90">[\s\S]*?<\/li>\n?)+/g, "<ol class=\"space-y-2 my-4\">$&</ol>");

  // 6. Split into blocks and wrap paragraphs, then restore code blocks
  return html
    .split(/\n\n+/)
    .map((block: string) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Restore Code Block if this is a placeholder
      if (trimmed.startsWith("CODEBLOCKPLACEHOLDER")) {
        const idMatch = trimmed.match(/\d+/);
        if (idMatch) {
          const id = parseInt(idMatch[0]);
          const { lang, content } = codeBlocks[id];
          let normalizedLang = lang;
          if (normalizedLang === "js") normalizedLang = "javascript";
          if (normalizedLang === "ts") normalizedLang = "typescript";
          
          // Escape content inside code block
          const escapedContent = content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
          return `<pre class="language-${normalizedLang} bg-card/50 p-4 rounded-xl border border-surfaceBorder/10 overflow-x-auto my-6"><code class="language-${normalizedLang} text-sm font-mono text-main/90">${escapedContent}</code></pre>`;
        }
      }

      // If it's already a block tag, return as is
      if (/^<(h1|h2|h3|ul|ol|li|hr|blockquote|pre)/.test(trimmed)) {
        return trimmed;
      }

      // Otherwise wrap in paragraph
      return `<p class="text-main/90 leading-relaxed my-4">${trimmed.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");
}
