function factorial(n) {
  let result = 1n;
  for (let i = 1n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

for (let i = 0; i <= 50; i++) {
  console.log(`${i}! = ${factorial(i)}`);
}
