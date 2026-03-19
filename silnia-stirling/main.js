function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function stirling(n) {
  return Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n);
}

for (let i = 1; i <= 15; i++) {
  console.log(`${i}! = ${factorial(i)}`);
  console.log(`Aproksymacja Stirlinga: ${i}! ~ ${stirling(i)}`);
}

console.log(`Gamma(5/2) ~ ${stirling(5 / 2 - 1)}`);
console.log(`Gamma(7/2) ~ ${stirling(7 / 2 - 1)}`);
console.log(`Gamma(9/2) ~ ${stirling(9 / 2 - 1)}`);