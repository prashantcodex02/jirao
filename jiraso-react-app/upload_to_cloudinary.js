import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
cloudinary.config({ 
  cloud_name: 'dphinzmi', 
  api_key: '255976377758913', 
  api_secret: 'Ik1gDg67po4PCpk0LOzaNvzIabo'
});

const assetsDir = path.join(__dirname, 'public', 'assets');
const outputMapFile = path.join(__dirname, 'src', 'imageMap.json');

async function uploadImages() {
  try {
    const files = await fs.readdir(assetsDir);
    const imageMap = {};

    // Filter images
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.svg') || 
      file.toLowerCase().endsWith('.webp')
    );

    console.log(`Found ${imageFiles.length} images to upload.`);

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const filePath = path.join(assetsDir, file);
      
      console.log(`[${i + 1}/${imageFiles.length}] Uploading ${file}...`);
      
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'jiraso_assets',
          use_filename: true,
          unique_filename: false,
          overwrite: false
        });
        
        // Save the optimized URL
        // Using f_auto,q_auto for best performance
        const optimizedUrl = cloudinary.url(result.public_id, {
          fetch_format: 'auto',
          quality: 'auto'
        });
        
        // Map original path string like 'assets/filename.png' to new URL
        imageMap[`assets/${file}`] = optimizedUrl;
        console.log(`  -> Uploaded successfully: ${optimizedUrl}`);
      } catch (uploadErr) {
        console.error(`  -> Failed to upload ${file}:`, uploadErr.message || uploadErr);
      }
    }

    // Write map to src/imageMap.json
    await fs.writeFile(outputMapFile, JSON.stringify(imageMap, null, 2));
    console.log(`\nSuccess! Mapping saved to ${outputMapFile}`);

  } catch (err) {
    console.error('Error during upload process:', err);
  }
}

uploadImages();
