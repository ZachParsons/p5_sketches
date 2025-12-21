const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Helper function to recursively get all files from a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Helper function to get random items from array
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Endpoint to get 3 random photos
app.get('/api/photos', (req, res) => {
  const photosDir = config.photosPath;

  try {
    // Get all files recursively
    const allFiles = getAllFiles(photosDir);

    // Filter for browser-compatible image files only
    const imageFiles = allFiles.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });

    if (imageFiles.length === 0) {
      return res.status(404).json({ error: 'No images found' });
    }

    // Get 3 random images
    const randomImages = getRandomItems(imageFiles, 3);

    // Convert file paths to URLs that work with the /image/* endpoint
    const imageUrls = randomImages.map(filePath => `/image${filePath}`);

    res.json(imageUrls);
  } catch (err) {
    console.error('Error reading photos directory:', err);
    res.status(500).json({ error: 'Failed to read photos directory' });
  }
});

// Serve the entire file system (with restrictions for security)
app.get('/image/*', (req, res) => {
  const imagePath = '/' + req.params[0];

  // Security check: only allow access to the configured photos directory
  if (!imagePath.startsWith(config.photosPath)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.sendFile(imagePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 