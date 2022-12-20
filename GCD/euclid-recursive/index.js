function gcd(a, b) {
  if (b === 0) {
    return Math.max(a, -a);
  } else {
    return gcd(b, a % b);
  }
}

console.log(gcd(80, 180))
console.log(gcd(80, 100))
console.log(gcd(80, 20))
console.log(gcd(40, 20))
console.log(gcd(20, 20))
console.log(gcd(20, 0))
console.log(gcd(80, -180))
console.log(gcd(-80, -180))
console.log(gcd(-80, 180))
console.log(gcd(23434, 3256))
console.log(gcd(2137, 131))
console.log(gcd(42, 56))
console.log(gcd(348, 192))