const g = 7;
const n = 9;
const p = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028,
  771.32342877765313, -176.61502916214059, 12.507343278686905,
  -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
];

function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function lanczos(z) {
  let x = p[0];
  for (let i = 1; i < p.length; i++) {
    x += p[i] / (z + i);
  }
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

for (let i = 1; i <= 15; i++) {
  console.log(`${i}! = ${factorial(i)}`);
  console.log(`Aproksymacja Lanczosa: ${i}! ~ ${lanczos(i)}`);
}

console.log(`Gamma(5/2) ~ ${lanczos(5 / 2 - 1)}`);
console.log(`Gamma(7/2) ~ ${lanczos(7 / 2 - 1)}`);
console.log(`Gamma(9/2) ~ ${lanczos(9 / 2 - 1)}`);
