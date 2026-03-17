const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const getRadius = (parameterA, parameterB, angle) => {
  return parameterA * angle + parameterB;
};

const polarToCartesian = (radius, angle) => {
  const x = radius * Math.cos(angle) + centerX;
  const y = radius * Math.sin(angle) + centerY;
  
  return [x, y];
};

const MAX_RADIUS = 250;
const A = 5;
const B = 0;
const ANGLE_INCREMENT = 0.01;
let lastRadius = 0;
let currentAngle = 0;
let lastX = centerX + B;
let lastY = centerY;

context.beginPath();
context.strokeStyle = 'black';
while (lastRadius < MAX_RADIUS) {
  context.moveTo(lastX, lastY);
  const newRadius = getRadius(A, B, currentAngle);
  const [newX, newY] = polarToCartesian(newRadius, currentAngle);
  context.lineTo(newX, newY);
  
  lastRadius = newRadius;
  currentAngle += ANGLE_INCREMENT;
  lastX = newX;
  lastY = newY;
}
context.stroke();