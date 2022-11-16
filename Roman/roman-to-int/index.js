// słownik konwersji, wyznaczający jaki symbol odpowiada jakiej liczbie
// z racji, że jest to słownik, kolejność symboli nie ma znaczenia
const CONVERSION_MAP = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1
};

function romanToInt(numeral) {
  // zmienna która przechowa wynik
  let result = 0;

  // przechodzimy po kolejnych znakach stringa zawierającego liczbę rzymską
  for (let i = 0; i < numeral.length; i++) {
    // pobieramy wartość aktualnego znaku
    let value = CONVERSION_MAP[numeral[i]];
    // jeśli nie jesteśmy na końcu, może być sytuacja, że trzeba będzie wykonać odejmowanie
    if (i < numeral.length - 1) {
      // sprawdzamy wartość następnego znaku
      const nextValue = CONVERSION_MAP[numeral[i + 1]];
      // jeśli jest wyższa, to znaczy że będziemy musieli odejmować
      if (nextValue > value) {
        // przypisujemy pomniejszoną wartość
        value = nextValue - value;
        // z racji, że rozpatrzyliśmy kolejny znak, to musimy przeskoczyć o jedną iterację
        i++;
      }
    }
    // dodajemy wyliczoną liczbę do aktualnego wyniku
    result += value;
  }

  // zwracamy wynik
  return result;
}

console.log(romanToInt('I'));
console.log(romanToInt('II'));
console.log(romanToInt('III'));
console.log(romanToInt('IV'));
console.log(romanToInt('V'));
console.log(romanToInt('XIII'));
console.log(romanToInt('XIV'));
console.log(romanToInt('XXV'));
console.log(romanToInt('MMXXII'));
console.log(romanToInt('MMCXXXVII'));
console.log(romanToInt('MMMCMXCIX'));
console.log(romanToInt('MMMCMLXXXVIII'));