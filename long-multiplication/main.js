// dla ułatwienia zakładam, że a i b są typu string
// również zakładam, że liczby mogą być tylko naturalne
function multiply(a, b) {
  // tworzymy tablicę na wynik
  const product = []
  // iterujemy po kolejnych cyfrach mnożnika, od tyłu
  for (let i = b.length - 1; i >= 0; i--) {
    // zmienna przechowująca przeniesioną cyfrę
    let carry = 0;
    // aktualna cyfra mnożnika
    const multiplicand = parseInt(b[i]);
    // iterujemy po kolejnych cyfrach mnożnej, od tyłu
    for (let j = a.length - 1; j >= 0; j--) {
      // aktualna cyfra mnożnej
      const multiplier = parseInt(a[j]);
      // aktualnie wyliczona cyfra wyniku na interesującej nas pozycji
      // jeśli nie istnieje, bierzemy 0
      const currentDigit = product[i + j + 1] || 0;
      // dodajemy do aktualnej cyfry przeniesioną cyfrę oraz iloczyn cyfr mnożnej i mnożnika
      const currentResult = currentDigit + carry + multiplicand * multiplier
      // zapisujemy aktualną wartość przeniesienia
      // dzielenie przez 10, ponieważ operujemy w systemie dziesiętnym
      carry = Math.trunc(currentResult / 10);
      // zapisujemy odpowiednią cyfrę do wyniku
      product[i + j + 1] = currentResult % 10;
    }
    // jak przeszliśmy przez całą mnożną, to zapisujemy przeniesioną cyfrę do wyniku
    if (carry > 0) {
      product[i] = carry;
    }
  }

  // zwracamy iloczyn jako string
  return product.join('');
}

// dwa proste przypadki, jednocyfrowe bez przeniesienia
console.log(multiply('2', '2')); // 4
console.log(multiply('3', '2')); // 6
// przypadek jednocyfrowy, gdzie zachodzi przeniesienie
console.log(multiply('3', '4')); // 12
// przypadek, gdzie mnożna ma więcej cyfr niż mnożnik, bez przeniesienia
console.log(multiply('10', '4')); // 40
// przypadek, gdzie mnożna ma więcej cyfr i zachodzi przeniesienie
console.log(multiply('15', '5')); // 75
// przypadek, gdzie mnożnik ma więcej cyfr od mnożnej
console.log(multiply('4', '1000')); // 4000
// sprawdzenie poprawności przeniesień przy największym przypadku (9*9)
console.log(multiply('9999', '9999')); // 99980001
// różne, duże liczby
console.log(multiply('15', '50000000000')); // 750000000000
console.log(multiply('1234567890', '987654321')); // 1219326311126352690
console.log(multiply('18446744073709551616', '18446744073709551616')); // 340282366920938463463374607431768211456
console.log(multiply('12345678901234567890', '987654321987654321')); // 12193263124676116323609205901126352690

