// Instructions:
// Quit Chrome.
// Open Chrome with flag to enable file access.
//  `open -a Google\ Chrome --args --allow-file-access-from-files`
////////////////////////////////////////////////////////////////////////////////
// Pre-runtime.
function dimensions() {
  return {
    width: 4000,
    height: 4000
  }
}

function makeBezier() {
  let { width: width, height: height } = dimensions()
  let [x1, x2, x3, x4, y1, y2, y3, y4] = Array(8).fill().map(() => Math.random() * width);

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

function drawBeziers(mask, count, weight) {
  for (let i = 0; i < count; i++) {
    let bezier = {
      x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4
    } = makeBezier()
    mask = drawBezier(mask, bezier, weight)
  }
  return mask;
}

function randomWeight(width) {
  return Math.floor(Math.random() * width);
}


// Set mask of random lines.
function createMask(count, weight, width, height) {
  // Initialize mask.
  let mask = createGraphics(width, height);
  // Draw lines & add to mask.
  return drawBeziers(mask, count, weight)
}


////////////////////////////////////////////////////////////////////////////////
// Runtime.
function preload() {
  img1 = loadImage('./assets/IMG_7348.jpeg');
  img2 = loadImage('./assets/IMG_7381.jpeg');
  img3 = loadImage('./assets/IMG_7543.jpeg');
}

function setup() {
  let { width: width, height: height } = dimensions()
  createCanvas(width, height);

  mask1 = createMask(3, randomWeight(width / 1), width, height)
  mask2 = createMask(3, randomWeight(width / 3), width, height)
  mask3 = createMask(3, randomWeight(width / 9), width, height)
}

function draw() {
  img1.mask(mask1); // Apply mask to image.
  image(img1, 0, 0);  // Draw image to canvas.

  img2.mask(mask2);
  image(img2, 0, 0);

  img3.mask(mask3);
  image(img3, 0, 0);

  noLoop();
}