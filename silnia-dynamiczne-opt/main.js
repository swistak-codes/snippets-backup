function factorial(n) {
  let prev2 = 1n;
  let prev1 = 1n;

  for (let i = 2; i <= n; i++) {
    const curr = (BigInt(i) - 1n) * (prev1 + prev2);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

for (let i = 0; i <= 50; i++) {
  console.log(`${i}! = ${factorial(i)}`);
}
