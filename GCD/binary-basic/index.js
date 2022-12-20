function gcd(a, b) {
  let g = 1;
  while (a % 2 === 0 && b % 2 === 0) {
    a = a / 2;
    b = b / 2;
    g = g * 2;
  }
  while (a > 0) {
    if (a % 2 === 0) {
      a = a / 2;
    } else if (b % 2 === 0) {
      b = b / 2;
    } else {
      const temp = Math.abs(a - b) / 2;
      if (a < b) {
        b = temp;
      } else {
        a = temp;
      }
    }
  }
  return b * g;
}

console.log(gcd(80, 180))
console.log(gcd(80, 100))
console.log(gcd(80, 20))
console.log(gcd(40, 20))
console.log(gcd(20, 20))
// cztery poniższe przypadki są nieobsługiwane przez algorytm
// console.log(gcd(20, 0))
// console.log(gcd(80, -180))
// console.log(gcd(-80, -180))
// console.log(gcd(-80, 180))
console.log(gcd(23434, 3256))
console.log(gcd(2137, 131))
console.log(gcd(42, 56))
console.log(gcd(348, 192))