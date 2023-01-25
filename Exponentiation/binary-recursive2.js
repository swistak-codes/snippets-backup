function power(a, n) {
  if (n === 0) {
    return 1;
  } else if (n % 2 === 0) {
    return power(a * a, n / 2);
  } else {
    return a * power(a * a, (n - 1) / 2);
  }
}

console.log(power(2, 0)); // 1
console.log(power(2, 1)); // 2
console.log(power(2, 2)); // 4
console.log(power(2, 3)); // 8
console.log(power(2, 4)); // 16
console.log(power(3, 3)); // 27
console.log(power(5, 5));  // 3125
console.log(power(10, 10)); // 10 000 000 000