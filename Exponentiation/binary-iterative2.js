function power(a, n) {
  // ustalamy początkową wartość wyniku na 1, czyli wartość a^0
  let result = 1;
  // iterujemy tak długo, jak wykładnik jest większy od 0
  while (n > 0) {
    if (n & 1 === 1) {
      // ostatni bit wynosi jeden, więc wykonujemy operacje SX;
      // z racji, że S jest wykonywane w obu przypadkach,
      // wewnątrz warunku wykonamy tylko X
      result = result * a;
    }
    // wykonujemy operację S, która jest wspólna dla obu przypadków
    a = a * a;
    // "skracamy" wykładnik o 1 bit
    n = n >> 1;
  }
  // zwracamy wynik obliczeń
  return result;
}

console.log(power(2, 0)); // 1
console.log(power(2, 1)); // 2
console.log(power(2, 2)); // 4
console.log(power(2, 3)); // 8
console.log(power(2, 4)); // 16
console.log(power(3, 3)); // 27
console.log(power(5, 5));  // 3125
console.log(power(10, 10)); // 10 000 000 000