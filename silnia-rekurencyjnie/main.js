function factorial(n) {
  n = BigInt(n);
  if (n === 0n) {
    return 1n;
  }
  return n * factorial(n - 1n);
}

for (let i = 0; i <= 50; i++) {
  console.log(`${i}! = ${factorial(i)}`);
}
