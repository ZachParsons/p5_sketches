// Instructions:
// Quit Chrome.
// Open Chrome with flag to enable file access.
//  `open -a Google\ Chrome --args --allow-file-access-from-files`
////////////////////////////////////////////////////////////////////////////////
// Pre-runtime.
function dimensions() {
  return {
    width: 1800,
    height: 1800
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

// Added from 20231119/sketch.js
function translateBezier(curvePosition, weight) {
  weight = randomBoolean() ? weight : -weight

  return {
    x1: curvePosition.x1 + weight,
    y1: curvePosition.y1 + weight,
    x2: curvePosition.x2 + weight,
    y2: curvePosition.y2 + weight,
    x3: curvePosition.x3 + weight,
    y3: curvePosition.y3 + weight,
    x4: curvePosition.x4 + weight,
    y4: curvePosition.y4 + weight
  };
}

function randomBoolean() {
  return Math.random() < 0.5;
}

function repeatDrawBezier(mask, curvePosition, weight, repetitions) {
  drawBezier(mask, curvePosition, weight);
  for (let i = 0; i < repetitions; i++) {
    curvePosition = translateBezier(curvePosition, (weight * 1.5));
    drawBezier(mask, curvePosition, weight);
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

////////////////////////////////////////////////////////////////////////////////
// Runtime.
function preload() {
  img3 = loadImage('./assets/IMG_7348.jpeg');
  img2 = loadImage('./assets/IMG_7381.jpeg');
  img1 = loadImage('./assets/IMG_7543.jpeg');
}

function setup() {
  let { width: width, height: height } = dimensions()
  createCanvas(width, height);

  mask1 = createMask(3, randomWeight(width / 1), width, height, 1);
  mask2 = createMask(3, randomWeight(width / 3), width, height, 10);
  mask3 = createMask(3, randomWeight(width / 9), width, height, 100);
}

function draw() {
  let { width: width, height: height } = dimensions()

  img1.mask(mask1); // Apply mask to image.
  image(img1, 0, 0, width, height);  // Draw image to canvas.

  img2.mask(mask2);
  image(img2, 0, 0, width, height);

  img3.mask(mask3);
  image(img3, 0, 0, width, height);

  noLoop();
}