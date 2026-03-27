const fs = require('fs');
const path = require('path');

const dirs = ['components', 'app'];
const exts = ['.tsx', '.ts'];

const map = {
  '\\bbg-dark\\b': 'bg-base',
  '\\bbg-\\[#0a0a0a\\]\\b': 'bg-base',
  '\\bbg-\\[#060d1a\\]\\b': 'bg-base',
  '\\bbg-slate-900\\b': 'bg-card',
  '\\bbg-slate-800\\b': 'bg-card',
  '\\btext-white\\b': 'text-main',
  '\\btext-stone-100\\b': 'text-main',
  '\\btext-slate-300\\b': 'text-muted',
  '\\btext-slate-400\\b': 'text-muted',
  '\\btext-slate-500\\b': 'text-muted',
  '\\btext-dark\\b': 'text-base',
  '\\bbg-white\\b': 'bg-main',
  '\\bborder-white': 'border-surfaceBorder',
  '\\bshadow-white': 'shadow-surfaceBorder',
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (exts.includes(path.extname(p))) {
      let content = fs.readFileSync(p, 'utf8');
      let modified = content;
      for (const [key, value] of Object.entries(map)) {
        const regex = new RegExp(key, 'g');
        modified = modified.replace(regex, value);
      }
      if (content !== modified) {
        fs.writeFileSync(p, modified);
        console.log(`Updated ${p}`);
      }
    }
  });
}

dirs.forEach(processDir);
console.log('Migration complete!');
