const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const OUTER_RADIUS = 250;
const SECOND_RADIUS = 200;
const MINUTE_RADIUS = 180;
const HOUR_RADIUS = 120;

const MINUTE_MARKER_RADIUS = OUTER_RADIUS - 5;
const SECOND_MINUTE_MARKER_RADIUS = MINUTE_MARKER_RADIUS - 5;
const HOUR_MARKER_RADIUS = (SECOND_RADIUS + SECOND_MINUTE_MARKER_RADIUS) / 2;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const getPosition = (angle, radius) => {
  const x = radius * Math.cos(angle - 0.5 * Math.PI) + centerX;
  const y = radius * Math.sin(angle - 0.5 * Math.PI) + centerY;
  return [x, y];
};

const clear = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const drawBorder = () => {
  context.beginPath();
  context.strokeStyle = "black";
  context.arc(centerX, centerY, OUTER_RADIUS, 0, 2 * Math.PI);
  context.stroke();
};

const drawFace = () => {
  for (let i = 1; i <= 60; i++) {
    const divisibleBy5 = i % 5 === 0;
    const angle = (2 * Math.PI * i) / 60;
    const radius = divisibleBy5
      ? SECOND_MINUTE_MARKER_RADIUS
      : MINUTE_MARKER_RADIUS;
    const [startX, startY] = getPosition(angle, radius);
    const [endX, endY] = getPosition(angle, OUTER_RADIUS);

    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();

    if (divisibleBy5) {
      const hour = (i / 5).toString();
      const [x, y] = getPosition(angle, HOUR_MARKER_RADIUS);
      context.font = "24px serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(hour, x, y);
    }
  }
};

const drawHand = (angle, color, radius) => {
  const [x, y] = getPosition(angle, radius);
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(centerX, centerY);
  context.lineTo(x, y);
  context.stroke();
};

const drawHoursHand = (hours, minutes) => {
  const time = hours + minutes / 60;
  const angle = (2 * Math.PI * time) / 12;
  drawHand(angle, "black", HOUR_RADIUS);
};

const drawMinutesHand = (minutes, seconds) => {
  const time = minutes + seconds / 60;
  const angle = (2 * Math.PI * time) / 60;
  drawHand(angle, "black", MINUTE_RADIUS);
};

const drawSecondsHand = (seconds, milliseconds) => {
  const time = seconds + milliseconds / 1000;
  const angle = (2 * Math.PI * time) / 60;
  drawHand(angle, "red", SECOND_RADIUS);
};

const draw = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours() % 12;
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();

  clear();
  drawBorder();
  drawFace();
  drawHoursHand(hours, minutes);
  drawMinutesHand(minutes, seconds);
  drawSecondsHand(seconds, milliseconds);

  window.requestAnimationFrame(() => {
    draw();
  });
};

draw();
