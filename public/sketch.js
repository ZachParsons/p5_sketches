// Global variables
let selectedImages = [];
let masks = [];

function preload() {
  // We'll load images after fetching the list from the server
}

// Pre-runtime.
function dimensions() {
  return {
    width: 1800,
    height: 1800
  }
}

function makeBezier() {
  let { width: width, height: height } = dimensions()
  let x1 = Math.random() * width;
  let x2 = Math.random() * width;
  let x3 = Math.random() * width;
  let x4 = Math.random() * width;
  let y1 = Math.random() * height;
  let y2 = Math.random() * height;
  let y3 = Math.random() * height;
  let y4 = Math.random() * height;

  return {
    x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4
  };
}

function drawBezier(mask, {
  x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4
}, weight) {
  mask.noFill();
  mask.strokeWeight(weight);
  mask.strokeCap(SQUARE);
  return mask.bezier(x1, y1, x2, y2, x3, y3, x4, y4)
}

// Added from 20231119/sketch.js
function translateBezierAlongPath(curvePosition, offsetX, offsetY) {
  return {
    x1: curvePosition.x1 + offsetX,
    y1: curvePosition.y1 + offsetY,
    x2: curvePosition.x2 + offsetX,
    y2: curvePosition.y2 + offsetY,
    x3: curvePosition.x3 + offsetX,
    y3: curvePosition.y3 + offsetY,
    x4: curvePosition.x4 + offsetX,
    y4: curvePosition.y4 + offsetY
  };
}

function randomBoolean() {
  return Math.random() < 0.5;
}

// Generate a random path curve for translations to follow
function makeTranslationPath() {
  let { width: width, height: height } = dimensions();
  // Create a curve with much larger range for visible gaps
  let range = Math.min(width, height) * 1.5;
  return {
    x1: (Math.random() - 0.5) * range,
    y1: (Math.random() - 0.5) * range,
    x2: (Math.random() - 0.5) * range,
    y2: (Math.random() - 0.5) * range,
    x3: (Math.random() - 0.5) * range,
    y3: (Math.random() - 0.5) * range,
    x4: (Math.random() - 0.5) * range,
    y4: (Math.random() - 0.5) * range
  };
}

// Get a point on a bezier curve at parameter t (0 to 1)
function bezierPoint2D(t, x1, y1, x2, y2, x3, y3, x4, y4) {
  let t1 = 1 - t;
  let x = t1*t1*t1*x1 + 3*t1*t1*t*x2 + 3*t1*t*t*x3 + t*t*t*x4;
  let y = t1*t1*t1*y1 + 3*t1*t1*t*y2 + 3*t1*t*t*y3 + t*t*t*y4;
  return { x, y };
}

function repeatDrawBezier(mask, curvePosition, weight, repetitions) {
  drawBezier(mask, curvePosition, weight);

  // Generate a random path for this set of repetitions to follow
  let translationPath = makeTranslationPath();

  for (let i = 0; i < repetitions; i++) {
    // Calculate position along the translation path (0 to 1)
    let t = (i + 1) / repetitions;

    // Get the offset point along the translation path
    let offset = bezierPoint2D(
      t,
      translationPath.x1, translationPath.y1,
      translationPath.x2, translationPath.y2,
      translationPath.x3, translationPath.y3,
      translationPath.x4, translationPath.y4
    );

    // Translate the curve along the path
    let translatedCurve = translateBezierAlongPath(curvePosition, offset.x, offset.y);
    drawBezier(mask, translatedCurve, weight);
  }
  return mask;
}

function drawBeziers(mask, count, weight, repetitions) {
  for (let i = 0; i < count; i++) {
    let bezier = makeBezier();
    mask = repeatDrawBezier(mask, bezier, weight, repetitions);
  }
  return mask;
}

function randomWeight(width) {
  return Math.floor(Math.random() * width);
}

function randomRepetitions() {
  return Math.floor(Math.random() * 100);
}

function createMask(count, weight, width, height, repetitions) {
  // Initialize mask.
  let mask = createGraphics(width, height);
  // Draw lines & add to mask.
  return drawBeziers(mask, count, weight, repetitions);
}


function setup() {
  let { width, height } = dimensions();
  createCanvas(width, height);
  background(220);
  
  // Fetch the list of photos from the server
  loadJSON('/api/photos', gotPhotos);
  
  // Display loading message
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text('Loading photos...', width/2, height/2);
}

function gotPhotos(data) {
  console.log('Got photo list:', data);
  
  // Randomly select 3 photos if there are enough
  if (data.length >= 3) {
    // Shuffle the array
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    
    // Take the first 3
    const selectedPaths = data.slice(0, 3);
    
    // Load the selected images
    loadImages(selectedPaths);
  } else {
    console.error('Not enough photos available');
    text('Not enough photos available', width/2, height/2 + 30);
  }
}

function loadImages(paths) {
  // Counter to track when all images are loaded
  let loadedCount = 0;
  
  // Load each image
  for (let i = 0; i < paths.length; i++) {
    loadImage(paths[i], img => {
      selectedImages[i] = img;
      loadedCount++;
      
      // When all images are loaded, create masks and draw
      if (loadedCount === paths.length) {
        createMasksAndDraw();
      }
    });
  }
}

function createMasksAndDraw() {
  let { width, height } = dimensions();

  // Create masks with thinner curves for visible gaps
  masks[0] = createMask(3, randomWeight(width / 1), width, height, 1);
  masks[1] = createMask(3, randomWeight(width / 4), width, height, 10);
  masks[2] = createMask(3, randomWeight(width / 64), width, height, 100);

  // Trigger the draw function
  redraw();
}

function draw() {
  // Only proceed if we have images and masks
  if (selectedImages.length < 3 || masks.length < 3) return;
  
  let { width, height } = dimensions();
  background(220);
  
  // Apply masks and display images
  for (let i = 0; i < 3; i++) {
    // Create a copy of the image to mask (to avoid modifying the original)
    let imgCopy = selectedImages[i].get();
    imgCopy.mask(masks[i]);
    image(imgCopy, 0, 0, width, height);
  }
  
  noLoop();
}

// Your existing functions (dimensions, makeBezier, etc.)
// ... 