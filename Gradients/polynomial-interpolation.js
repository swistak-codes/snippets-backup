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

// funkcja obliczająca sześcienną krzywą Béziera
function cubicBezier(p1, p2, t) {
  return 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;
}

// funkcja ograniczająca przedział do 0-1
function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

// funkcja zwracająca przybliżony kształt krzywej
function getCurveApproximation(p1, p2, numPoints) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    points.push({
      x: cubicBezier(p1.x, p2.x, t),
      y: clamp(cubicBezier(p1.y, p2.y, t)),
    });
  }
  return points;
}

// funkcja interpolująca t z krzywej Béziera
function getTFromCurve(curve, t) {
  // znajdziemy dwa punkty pomiędzy naszym aktualnym t
  // korzystając z wyszukiwania binarnego (punkty są posortowane po x)
  let left = 0;
  let right = curve.length - 1;
  // szukamy tak długo, aż znajdziemy sąsiadujące ze sobą punkty
  while (right - left > 1) {
    const mid = Math.trunc((left + right) / 2);
    if (curve[mid].x < t) {
      left = mid;
    } else {
      right = mid;
    }
  }
  // wyciągamy punkty pomiędzy którymi znajduje się t
  const p0 = curve[left];
  const p1 = curve[right];
  // wyliczamy w jakim miejscu pomiędzy punktami jest t
  const lerpT = (t - p0.x) / (p1.x - p0.x);
  // interpolujemy wartość y
  return lerp(p0.y, p1.y, lerpT);
}

// funkcja zwracająca kolory stanowiące gradient
function getGradientColors(startColor, endColor, numColors, p1, p2) {
  // generujemy przybliżoną krzywą składającą się z tylu punktów, co gradient
  // to nie jest reguła, że konkretnie tyle punktów trzeba użyć
  const curve = getCurveApproximation(p1, p2, numColors);
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const t = i / (numColors - 1);
    // aproksymujemy wartość t na podstawie krzywej
    const polyT = getTFromCurve(curve, t);
    colors.push(lerpColor(startColor, endColor, polyT));
  }
  return colors;
}

console.log(
  getGradientColors(
    { r: 0, g: 0, b: 0 },
    { r: 255, g: 255, b: 255 },
    10,
    { x: 0.33, y: 1 },
    { x: 0.68, y: 1 }
  )
);
