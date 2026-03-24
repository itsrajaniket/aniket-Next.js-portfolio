const fs = require('fs');
const path = require('path');

const dirs = ['components', 'app'];
const exts = ['.tsx', '.ts'];

const map = {
  '\\bbg-dark\\b': 'bg-base',
  '\\bbg-\\[#0a0a0a\\]\\b': 'bg-base',
  '\\bbg-\\[#060d1a\\]\\b': 'bg-base',
  '\\bbg-\\[#0B1120\\]\\b': 'bg-base',
  '\\bbg-slate-900\\b': 'bg-card',
  '\\bbg-slate-800\\b': 'bg-card',
  '\\btext-white\\b': 'text-main',
  '\\btext-stone-100\\b': 'text-main',
  '\\btext-slate-100\\b': 'text-main',
  '\\btext-slate-200\\b': 'text-main',
  '\\btext-slate-[345]00\\b': 'text-muted',
  '\\bborder-white\\b': 'border-surfaceBorder',
  '\\bborder-slate-700\\b': 'border-surfaceBorder',
  '\\bshadow-white\\b': 'shadow-surfaceBorder',
  '\\bbg-white\\b': 'bg-inverseBase',
  '\\btext-dark\\b': 'text-inverseText',
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
console.log('Migration V3 complete!');
