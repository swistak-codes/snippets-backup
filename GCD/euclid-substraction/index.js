function gcd(a, b) {
  while (a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }
  return a;
}

console.log(gcd(80, 180))
console.log(gcd(80, 100))
console.log(gcd(80, 20))
console.log(gcd(40, 20))
console.log(gcd(20, 20))
// poniższe trzy przypadki nie zadziałają!
// console.log(gcd(20, 0))
// console.log(gcd(-80, -180))
// console.log(gcd(-80, 180))
console.log(gcd(23434, 3256))
console.log(gcd(2137, 131))
console.log(gcd(42, 56))
console.log(gcd(348, 192))