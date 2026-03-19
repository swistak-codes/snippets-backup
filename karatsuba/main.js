// dla ułatwienia zakładam, że a i b są typu string
// również zakładam, że liczby mogą być tylko naturalne
function karatsuba(a, b) {
  // usuwamy zera na przodzie liczb, aby nie zaburzyły algorytmu
  // wykorzystamy do tego proste wyrażenie regularne
  a = a.replace(/^0+/, '');
  b = b.replace(/^0+/, '');
  // jeśli jedna z liczb jest jednocyfrowa, wykonujemy tradycyjne mnożenie
  if (a.length < 2 || b.length < 2) {
    return parseInt(a || '0') * parseInt(b || '0');
  }
  // znajdujemy ile cyfr ma pozostać w drugiej części liczby
  const m = Math.trunc(Math.max(a.length, b.length) / 2);
  // obliczamy punkt podziału dla każdej z liczb
  const aM = a.length - m;
  const bM = b.length - m;
  // dzielimy liczby na mniejsze
  // jeśli po podziale nic nie zostaje w pierwszej części, dajemy 0
  const a1 = a.substring(0, aM) || '0';
  const a0 = a.substring(aM);
  const b1 = b.substring(0, bM) || '0';
  const b0 = b.substring(bM);
  // wywołujemy algorytm rekurencyjnie dla mniejszych liczb
  const z0 = karatsuba(a0, b0);
  const z2 = karatsuba(a1, b1);
  // tutaj niestety musimy dokonać konwersji typów
  const z1 = karatsuba(
    (parseInt(a1) + parseInt(a0)).toString(),
    (parseInt(b1) + parseInt(b0)).toString()
  ) - z2 - z0;
  // zwracamy rezultat zgodnie ze wzorem
  return (z2 * Math.pow(10, m * 2)) + (z1 * Math.pow(10, m)) + z0;
}

console.log(karatsuba('2', '2')); // 4
console.log(karatsuba('3', '2')); // 6
console.log(karatsuba('3', '4')); // 12
console.log(karatsuba('10', '4')); // 40
console.log(karatsuba('15', '5')); // 75
console.log(karatsuba('4', '1000')); // 4000
console.log(karatsuba('9999', '9999')) // 99980001
console.log(karatsuba('15', '50000000000')); // 750000000000
console.log(karatsuba('1234567890', '987654321')); // 1219326311126352690
// poniższe działania niestety nie obliczymy na wbudowanym typie liczbowym
console.log(karatsuba('18446744073709551616', '18446744073709551616')); // 340282366920938463463374607431768211456
console.log(karatsuba('12345678901234567890', '987654321987654321')); // 12193263124676116323609205901126352690