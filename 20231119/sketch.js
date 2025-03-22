function dimensions() {
  return {
    width: 1800,
    height: 1800
  }
}

function pickColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 127);
  let c = color(r, g, b);
  fill(c);
  noStroke();
  return { r: r, g: g, b: b }
}

function drawLines() {
  let { width: width, height: height } = dimensions()
  let { r, g, b } = pickColor();
  noFill();
  let weight = Math.floor(Math.random() * width);
  strokeWeight(weight)
  stroke(r, g, b)
  strokeCap(SQUARE);

  width = randomBoolean() ? width : -width

  let x1 = Math.random() * width;
  let x2 = Math.random() * width;
  let x3 = Math.random() * width;
  let x4 = Math.random() * width;
  let y1 = Math.random() * width;
  let y2 = Math.random() * width;
  let y3 = Math.random() * width;
  let y4 = Math.random() * width;

  let curvePosition = makeBezier(x1, y1, x2, y2, x3, y3, x4, y4)
  let repetitions = randomRepetitions();
  repeatDrawBezier(curvePosition, weight, repetitions);
}

function makeBezier(x1, y1, x2, y2, x3, y3, x4, y4) {
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

function translateBezier(curvePosition, weight) {
  weight = randomBoolean() ? weight : -weight

  const translated = new Object({
    x1: curvePosition.x1 + weight,
    y1: curvePosition.y1 + weight,
    x2: curvePosition.x2 + weight,
    y2: curvePosition.y2 + weight,
    x3: curvePosition.x3 + weight,
    y3: curvePosition.y3 + weight,
    x4: curvePosition.x4 + weight,
    y4: curvePosition.y4 + weight
  })
  return translated;
}

function randomBoolean() { return Math.random() < 0.5; }

function repeatDrawBezier(curvePosition, weight, repetitions) {
  drawBezier(curvePosition);
  for (let i = 0; i < repetitions; i++) {
    curvePosition = translateBezier(curvePosition, (weight * 1.5));
    drawBezier(curvePosition);
  }
}



function drawLine(weight, repetitions) {
  let { r, g, b } = pickColor();
  noFill();
  strokeWeight(weight)
  stroke(r, g, b)
  strokeCap(SQUARE);

  width = randomBoolean() ? width : -width

  let x1 = Math.random() * width;
  let x2 = Math.random() * width;
  let x3 = Math.random() * width;
  let x4 = Math.random() * width;
  let y1 = Math.random() * width;
  let y2 = Math.random() * width;
  let y3 = Math.random() * width;
  let y4 = Math.random() * width;

  let curvePosition = makeBezier(x1, y1, x2, y2, x3, y3, x4, y4)
  repeatDrawBezier(curvePosition, weight, repetitions);
}

function drawLines(count, weight, repetitions) {
  for (let i = 0; i < count; i++) {
    drawLine(weight, repetitions);
  }
}

function randomCount() { return Math.floor((Math.random() * 100) * .25) }

function randomWeight(width) {
  return Math.floor(Math.random() * width);
}

function randomRepetitions() {
  return Math.floor(Math.random() * 100);
}

function drawRandom() {
  return drawLines(randomCount(), randomWeight(dimensions().width), randomRepetitions())
}

function drawThreeTiers() {
  let { width: width } = dimensions()
  drawLines(3, randomWeight(width), 1);
  drawLines(3, randomWeight(width / 10), 10);
  drawLines(3, randomWeight(width / 100), 100);
}

function setup() {
  console.log()
  let { width: width, height: height } = dimensions()
  createCanvas(width, height);
  background(220);
  frameRate(5);
}

function draw() {
  drawRandom();
  drawThreeTiers();
  noLoop();
}


// TODOs:
//  [x] curve the lines.
//  [x] make parallel lines.
//  [x] extract line count, color, position, weight, repetitions.
//  [x] make three big lines with no repetitions w ~1 repetition, three medium lines with ~10 repetitions, 3 small lines w ~100 repetitions.
//  ~~[ ] draw inner square for composition frame.~~
//  [ ] make a non-gap repetition that increments line color only.
//  [ ] mask an area of line repetitions.