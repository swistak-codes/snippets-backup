// tablica konwersji, gdzie zaczynamy od największego symbolu i idziemy po kolei do najmniejszego
// dla uproszczenia algorytmu zapisujemy w niej także wartości pomniejszone, czyli z mniejszym symbolem przed, takie jak IX (10 pomniejszone o 1 = 9) czy IV (5 pomniejszone o 1 = 4).
const CONVERSION_TABLE = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
]

function intToRoman(number) {
  // zmienna, która przechowa ile liczby jeszcze zostało nam do konwersji
  let leftToConvert = number;
  // zmienna przechowująca wynik
  let result = '';

  // iterujemy po kolei po tablicy konwersji
  // zapis [symbol, value] to destrukturyzacja tablicy do dwóch zmiennych: symbol i value
  for (const [symbol, value] of CONVERSION_TABLE) {
    // sprawdzamy ile razy symbol musi zostać powtórzony
    const times = Math.trunc(leftToConvert / value)
    // wyliczamy liczbę, która będzie przekształcana w następnej iteracji
    leftToConvert %= value;
    // dodajemy do wyniku symbole powtórzone odpowiednią liczbę razy
    result += symbol.repeat(times);
  }

  return result;
}

console.log(intToRoman(1)); // I
console.log(intToRoman(2)); // II
console.log(intToRoman(3)); // III
console.log(intToRoman(4)); // IV
console.log(intToRoman(5)); // V
console.log(intToRoman(13)); // XIII
console.log(intToRoman(14)); // XIV
console.log(intToRoman(25)); // XXV
console.log(intToRoman(2022)); // MMXXII
console.log(intToRoman(2137)); // MMCXXXVII
console.log(intToRoman(3999)); // MMMCMXCIX