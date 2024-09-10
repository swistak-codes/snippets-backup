// funkcja obliczająca interpolację liniową
function lerp(p0, p1, t) {
  return (1 - t) * p0 + t * p1;
}

// funkcja obliczająca interpolację liniową dla koloru
function lerpColor(c0, c1, t) {
  // zakładamy, że kolory są zapisane 8-bitowo, dlatego zaokrąglimy
  return {
    r: Math.round(lerp(c0.r, c1.r, t)),
    g: Math.round(lerp(c0.g, c1.g, t)),
    b: Math.round(lerp(c0.b, c1.b, t)),
  };
}

// funkcja zwracająca kolory stanowiące gradient
function getGradientColors(startColor, endColor, numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const t = i / (numColors - 1);
    colors.push(lerpColor(startColor, endColor, t));
  }
  return colors;
}

console.log(
  getGradientColors({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 10)
);
