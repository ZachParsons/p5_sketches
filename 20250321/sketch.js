// Instructions:
// Quit Chrome.
// Open Chrome with flag to enable file access.
//  `open -a Google\ Chrome --args --allow-file-access-from-files`

// Pre-runtime.
let img1;
let mask1;
let mask2;
let width = 3500;
let height = 3500;

// function makeBezier(x1, y1, x2, y2, x3, y3, x4, y4) {
function makeBezier() {
  let x1 = Math.random() * width;
  let x2 = Math.random() * width;
  let x3 = Math.random() * width;
  let x4 = Math.random() * width;
  let y1 = Math.random() * width;
  let y2 = Math.random() * width;
  let y3 = Math.random() * width;
  let y4 = Math.random() * width;

  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    x3: x3,
    y3: y3,
    x4: x4,
    y4: y4
  };
}

function drawBezier({
  x1: x1,
  y1: y1,
  x2: x2,
  y2: y2,
  x3: x3,
  y3: y3,
  x4: x4,
  y4: y4
}) {
  bezier(x1, y1, x2, y2, x3, y3, x4, y4)
}

// Set mask of random lines.
function createMask(w, h) {
  let mask = createGraphics(w, h);
  
  for (let i = 0; i < 9; i++) {
    let x1 = Math.random() * width;
    let x2 = Math.random() * width;
    let x3 = Math.random() * width;
    let x4 = Math.random() * width;
    let y1 = Math.random() * width;
    let y2 = Math.random() * width;
    let y3 = Math.random() * width;
    let y4 = Math.random() * width;
    
    mask.noFill();
    mask.strokeWeight(100);
    mask.strokeCap(SQUARE);
    mask.bezier(x1, y1, x2, y2, x3, y3, x4, y4)
  }


  // let bezier = makeBezier()
  // mask = drawBezier(bezier)

  return mask;
}

// Runtime.
function preload() {
  img1 = loadImage('./assets/IMG_0942.jpeg');
  img2 = loadImage('./assets/IMG_1002.jpeg');
  img3 = loadImage('./assets/IMG_7543.jpeg');
}

function setup() {
  createCanvas(width, height);
  mask1 = createMask(width, height)
  mask2 = createMask(width, height)
  mask3 = createMask(width, height)
}



function draw() {
  img1.mask(mask1);
  image(img1, 0, 0);
  
  img3.mask(mask3);
  image(img3, 0, 0);
  
  img2.mask(mask2);
  image(img2, 0, 0);
  

}