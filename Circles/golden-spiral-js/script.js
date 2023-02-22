const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const MAX_RADIUS = 500;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const GOLDEN_RATIO = 1.618033988749;

const getRadius = (angle) => {
  return Math.pow(GOLDEN_RATIO, 2 * angle / Math.PI)
};

const polarToCartesian = (radius, angle) => {
  const x = radius * Math.cos(angle) + centerX;
  const y = radius * Math.sin(angle) + centerY;
  
  return [x, y];
};

const ANGLE_INCREMENT = 0.01;
let lastRadius = 0;
let currentAngle = 0;
let lastX = centerX;
let lastY = centerY;

context.beginPath();
context.strokeStyle = 'black';
while (lastRadius < MAX_RADIUS) {
  context.moveTo(lastX, lastY);
  const newRadius = getRadius(currentAngle);
  const [newX, newY] = polarToCartesian(newRadius, currentAngle);
  context.lineTo(newX, newY);
  
  lastRadius = newRadius;
  lastX = newX;
  lastY = newY;
  currentAngle += ANGLE_INCREMENT;
}
context.stroke();