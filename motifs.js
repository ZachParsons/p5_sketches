// # motifs 

// Arabesque
// (Koch) Snowflake
// Knots 
// Moire
// Origami

function setup() {
  createCanvas(800, 800); 
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function knot() {
  var numberOfPoints = (randomInt(8, 16) * 2) - 1;
  console.log(numberOfPoints);
  
  var points = [];
  function generatePoints(p){  
    for (let i = 0; i < numberOfPoints; i++) {
      p.push(
        [Math.floor(Math.random() * 800), Math.floor(Math.random() * 800)]
      );
    }
  }
  points = generatePoints(points);
  

  console.log({"points": points});
 
  // line(points[0][0], points[0][1], points[1][0], points[1][1]);
  // line(points[1][0], points[1][1], points[2][0], points[2][1]);
  // line(points[2][0], points[2][1], points[3][0], points[3][1]);
  // line(points[3][0], points[3][1], points[4][0], points[4][1]);
  // line(points[4][0], points[4][1], points[0][0], points[0][1]);
  
//   function joinPoints(points) {
//   var joined = [];
//    for (let i = 0; i < points; i++) {
//       joined.push([points[0][0], points[0][1], points[1][0], points[1][1]]);
//     }
//     return joined;
//   } 
  
  // console.log({"joined": joinPoints(points)})
  
//   function drawPoints() {
//    for (let i = 0; i < connectedPoints; i++) {
//     line(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
//   }
}

function draw() {
  background(220);
  knot();
  noLoop(); 
}Diagrams