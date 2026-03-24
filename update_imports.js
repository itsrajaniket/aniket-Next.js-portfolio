const fs = require('fs');
const path = require('path');

const basePath = __dirname;
const directoriesToSearch = ['app', 'components', 'lib'];

const moves = {
  layout: ['Navbar', 'Footer', 'MobileNav', 'NavLinks'],
  sections: [
    'Hero', 'About', 'Skills', 'WorkExperience',
    'Projects', 'Services', 'Education', 'BlogPreview', 'Contact'
  ],
  visuals: ['MouseTrailCanvas', 'SpiderCanvas'],
  animations: ['MotionWrapper', 'SectionReveal', 'Typewriter'],
  analytics: ['AnalyticsEvents', 'GoogleAnalytics'],
  shared: ['ProjectCard', 'ContactForm'],
  ui: ['CopyButton', 'ScrollToTop', 'Toast']
};

const map = {};
for (const [folder, files] of Object.entries(moves)) {
  for (const file of files) {
    map[file] = folder;
  }
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [component, folder] of Object.entries(map)) {
    // 1. Absolute paths: @/components/Hero -> @/components/folder/Hero
    const regex1 = new RegExp(`@/components/${component}(?=['"\\/])`, 'g');
    if (regex1.test(content)) {
      content = content.replace(regex1, `@/components/${folder}/${component}`);
      changed = true;
    }

    // 2. Relative paths from root of components/ (which they used to be) -> folder
    // E.g. `./Hero` inside `components/...` -> `@/components/folder/Hero`
    // However, we want to be careful not to rewrite `./Toast` inside `components/ui/index.ts`.
    // We only rewrite `./X` if X is not in the SAME folder as the currently processed file.
    
    // So let's extract the CURRENT file's folder.
    const relativePathFromRoot = path.relative(path.join(basePath, 'components'), path.dirname(filePath)).replace(/\\/g, '/');
    
    // Only rewrite if it's importing a component that represents a move.
    // E.g. import SectionReveal from "./SectionReveal"
    const regex2 = new RegExp(`['"]\\./${component}['"]`, 'g');
    if (regex2.test(content)) {
      // If the component we import is in a different folder now than where this file is currently
      if (folder !== relativePathFromRoot) {
        content = content.replace(regex2, `"@/components/${folder}/${component}"`);
        changed = true;
      }
    }
    
    // What if it was like "./ui/Toast" inside what used to be `components/Contact.tsx`?
    // In Contact.tsx (now sections/Contact.tsx): `import Toast from "./ui/Toast"`
    // We can manually fix things like `./ui/Toast`.
    const regex3 = new RegExp(`['"]\\./ui/${component}['"]`, 'g');
    if (regex3.test(content)) {
        content = content.replace(regex3, `"@/components/ui/${component}"`);
        changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}

for (const dir of directoriesToSearch) {
  const dirPath = path.join(basePath, dir);
  if (fs.existsSync(dirPath)) {
    processDirectory(dirPath);
  }
}
