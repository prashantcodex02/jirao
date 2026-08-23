import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const mapFile = path.join(__dirname, 'src', 'imageMap.json');

async function fixUrls() {
  const mapContent = await fs.readFile(mapFile, 'utf8');
  const imageMap = JSON.parse(mapContent);

  // Find all .jsx, .html files in src and its subdirectories
  async function walk(dir) {
    let files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(await walk(fullPath));
      } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.html') || entry.name.endsWith('.css')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const files = await walk(srcDir);
  // Also include index.html in root
  files.push(path.join(__dirname, 'index.html'));

  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');
    let originalContent = content;

    for (const [key, oldUrl] of Object.entries(imageMap)) {
      // key is like "assets/hero.png"
      const ext = path.extname(key); // e.g. ".png"
      
      // oldUrl is like "https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/hero?_a=BAMCr6WO0"
      if (!oldUrl.includes('?')) continue;
      
      const [baseUrl, query] = oldUrl.split('?');
      // If the baseUrl already ends with an extension, skip (e.g. if we run this twice)
      if (baseUrl.endsWith(ext)) continue;
      
      const newUrl = `${baseUrl}${ext}?${query}`;
      
      // replace globally in file
      content = content.split(oldUrl).join(newUrl);
    }

    if (content !== originalContent) {
      await fs.writeFile(file, content, 'utf8');
      console.log(`Updated URLs in: ${path.relative(__dirname, file)}`);
    }
  }
  console.log('Done fixing URLs!');
}

fixUrls().catch(console.error);
