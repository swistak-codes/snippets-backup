function gcd(a, b) {
  let g = 0;
  while ((a & 1) === 0 && (b & 1) === 0) {
    a = a >> 1;
    b = b >> 1;
    g++;
  }
  while (a > 0) {
    if ((a & 1) === 0) {
      a = a >> 1;
    } else if ((b & 1) === 0) {
      b = b >> 1;
    } else {
      const temp = Math.abs(a - b) >> 1;
      if (a < b) {
        b = temp;
      } else {
        a = temp;
      }
    }
  }
  return b << g;
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