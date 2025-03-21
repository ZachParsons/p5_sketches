function setup(){
  createCanvas(1000, 1000, WEBGL);
}

function draw(){
  background(250);
  
  normalMaterial();
  
  translate(0, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(200, 100);
  pop();
  
  // translate(240, 0, 0);
  // push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // sphere(70);
  // pop();

  drawBez();
  drawShape();

}

function drawBez(){
  // noFill();
  stroke(177, 177, 177);
  bezier(-180, -200, 1000, -100, 1090, 990, 850, 680);
}

function drawShape(){
  stroke(0);
  beginShape();
  curveVertex(40,40);
  curveVertex(40,40);
  curveVertex(80,60);
  curveVertex(100,100);
  curveVertex(60,120);
  curveVertex(50,150);
  curveVertex(50,150);
  endShape();
}