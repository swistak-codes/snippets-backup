// funkcja wyliczająca sumę kontrolną algorytmem Adler-32
// zakładam, że `bytes` jest tablicą liczb w zakresie [0-255]
function adler32(bytes) {
  // inicjalizujemy zmienne przechowujące obie sumy kontrolne
  let a = 1;
  let b = 0;
  // iterujemy po kolejnych bajtach
  for (const byte of bytes) {
    // A zwiększamy o aktualny bajt, modulo 65521
    a = (a + byte) % 65521;
    // B zwiększamy o aktualną wartość A, modulo 65521
    b = (b + a) % 65521;
  }
  // przesuwamy B o 16 bitów i "doczepiamy" A
  // "doczepić" możemy za pomocą operacji OR
  return b << 16 | a;
}

// przykład z Wikipedii
console.log(adler32([87, 105, 107, 105, 112, 101, 100, 105, 97]));
console.log(adler32([0, 0, 0, 0]));
console.log(adler32([0, 0, 0, 1]));
console.log(adler32([0, 0, 1, 0]));
console.log(adler32([0, 1, 0, 0]));
console.log(adler32([1, 0, 0, 0]));
console.log(adler32([1, 1, 1, 1]));