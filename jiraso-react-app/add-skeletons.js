import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

async function processFiles() {
  async function walk(dir) {
    let files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(await walk(fullPath));
      } else if (entry.name.endsWith('.jsx')) {
        files.push(fullPath);
      }
    }
    return files;
  }
  const files = await walk(srcDir);

  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');
    let originalContent = content;

    const imgRegex = /<img\s([^>]+)>/g;
    
    content = content.replace(imgRegex, (match, attrs) => {
      if (attrs.includes('skeleton-loading')) return match;

      let newAttrs = attrs;
      
      if (newAttrs.includes('className="')) {
        newAttrs = newAttrs.replace(/className="/, 'className="skeleton-loading ');
      } else if (newAttrs.includes("className='")) {
        newAttrs = newAttrs.replace(/className='/, "className='skeleton-loading ");
      } else {
        newAttrs = 'className="skeleton-loading" ' + newAttrs;
      }

      newAttrs = `onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} ` + newAttrs;

      return `<img ${newAttrs}>`;
    });

    if (content !== originalContent) {
      await fs.writeFile(file, content, 'utf8');
      console.log(`Updated: ${path.relative(__dirname, file)}`);
    }
  }
  console.log('Done adding skeletons!');
}

processFiles().catch(console.error);
