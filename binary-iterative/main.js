function power(a, n) {
  // ustalamy początkową wartość wyniku na 1, czyli wartość a^0
  let result = 1;
  // iterujemy tak długo, jak wykładnik jest większy od 0
  while (n > 0) {
    if (n % 2 === 0) {
      // przypadek, kiedy n jest parzyste
      // aktualizujemy wykładnik
      n = n / 2;
      // podnosimy podstawę potęgi do kwadratu i zapamiętujemy ją
      a = a * a;
    } else {
      // przypadek, kiedy n jest nieparzyste
      // najpierw mnożymy wynik przez aktualną podstawę
      result = result * a;
      // następnie znowu podnosimy podstawę potęgi do kwadratu
      a = a * a;
      // i odpowiednio aktualizujemy wykładnik
      n = (n - 1) / 2;
    }
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