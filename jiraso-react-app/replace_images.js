import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageMapPath = path.join(__dirname, 'src', 'imageMap.json');
const srcDir = path.join(__dirname, 'src');

async function processDirectory(dir, map) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath, map);
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js') || entry.name.endsWith('.css') || entry.name.endsWith('.html'))) {
      await updateFile(fullPath, map);
    }
  }
}

async function updateFile(filePath, map) {
  let content = await fs.readFile(filePath, 'utf8');
  let originalContent = content;
  
  // Sort keys by length descending to prevent partial replacements (e.g. replacing 'assets/1.png' inside 'assets/10.png')
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    const cloudinaryUrl = map[key];
    const baseKey = key.startsWith('assets/') ? key.slice(7) : key;
    
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    };
    const safeBaseKey = escapeRegExp(baseKey);
    
    // Create a regex to match: 
    // - optional leading slash
    // - "assets/"
    // - the filename
    // - optional query parameters ?v=... 
    // inside quotes or url()
    
    // We can just use a regex replacement:
    const regex = new RegExp(`['"\`\\(]/?assets/${safeBaseKey}(\\?[^'"\`\\)]*)?['"\`\\)]`, 'g');
    
    content = content.replace(regex, (match) => {
      // Keep the first character (the quote or parenthesis) and last character
      const firstChar = match[0];
      const lastChar = match[match.length - 1];
      return `${firstChar}${cloudinaryUrl}${lastChar}`;
    });
  }

  if (content !== originalContent) {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Updated images in: ${path.relative(__dirname, filePath)}`);
  }
}

async function run() {
  try {
    console.log('Loading imageMap.json...');
    const mapData = await fs.readFile(imageMapPath, 'utf8');
    const imageMap = JSON.parse(mapData);
    
    console.log(`Loaded ${Object.keys(imageMap).length} image mappings. Updating source files...`);
    await processDirectory(srcDir, imageMap);
    
    // Also check index.html in the root
    const indexPath = path.join(__dirname, 'index.html');
    try {
        await updateFile(indexPath, imageMap);
    } catch(e) {}
    
    console.log('Done replacing image paths!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
