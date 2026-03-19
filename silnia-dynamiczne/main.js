function factorial(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1n;
  dp[1] = 1n;

  for (let i = 2; i <= n; i++) {
    dp[i] = (BigInt(i) - 1n) * (dp[i - 1] + dp[i - 2]);
  }

  return dp[n];
}

for (let i = 0; i <= 50; i++) {
  console.log(`${i}! = ${factorial(i)}`);
}
