const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content/blog');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('(/contact)')) {
    content = content.replace(/\(\/contact\)/g, '(/#contact)');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
