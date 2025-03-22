// Instructions:
// Quit Chrome.
// Open Chrome with flag to enable file access.
//  `open -a Google\ Chrome --args --allow-file-access-from-files`


let img;
let mask;

function preload() {
  photo = loadImage('./assets/box.jpg');
  img = loadImage('./assets/spotify_your_pie.png');
}

function setup() {
  width = 1800;
  height = 1800;
  createCanvas(width, height);
  mask = createGraphics(width, height);
  
  mask.stroke(255);
  mask.strokeWeight(10);
  
  for (let i = 0; i < 50; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(width);
    mask.line(x1, y1, x2, y2);
  }
}

function draw() {
  background(50);
  img.mask(mask);
  image(img, 0, 0);
}