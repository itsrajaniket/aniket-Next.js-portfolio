const fs = require('fs');
const path = require('path');

const dirs = ['components', 'app'];
const exts = ['.tsx', '.ts'];

const replacements = [
  { match: /\bbg-base\b/g, replacement: 'bg-dark' },
  { match: /\bbg-card\b/g, replacement: 'bg-slate-900' },
  { match: /\btext-main\b/g, replacement: 'text-white' },
  { match: /\btext-muted\b/g, replacement: 'text-slate-400' },
  { match: /\bbg-main\b/g, replacement: 'bg-white' },
  { match: /\bborder-surfaceBorder/g, replacement: 'border-white' },
  { match: /\bshadow-surfaceBorder/g, replacement: 'shadow-white' },
  
  // Cleanly restoring text-dark from text-base collisions:
  { match: /bg-accent text-base/g, replacement: 'bg-accent text-dark' },
  { match: /to-accent text-base/g, replacement: 'to-accent text-dark' },
  { match: /hover:text-base/g, replacement: 'hover:text-dark' },
  { match: /text-sm text-base/g, replacement: 'text-sm text-dark' },
  { match: /bg-white text-base/g, replacement: 'bg-white text-dark' } // since bg-main is processed first or simultaneously?
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (exts.includes(path.extname(p))) {
      let content = fs.readFileSync(p, 'utf8');
      let modified = content;
      replacements.forEach(r => {
        modified = modified.replace(r.match, r.replacement);
      });
      if (content !== modified) {
        fs.writeFileSync(p, modified);
        console.log(`Reverted ${p}`);
      }
    }
  });
}

// Special case: since bg-main is replaced with bg-white, if the string was `bg-main text-base`,
// after replacing bg-main, it becomes `bg-white text-base`, which matches our text-base revert.
// This is exactly why we use arrays to sequence it.

processDir(dirs[0]); // components
processDir(dirs[1]); // app
console.log('Reversal complete!');
