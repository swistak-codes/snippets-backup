// tablica z 7 pierwszymi liczbami naturalnymi
const numbers = [0, 1, 2, 3, 4, 5, 6];

// sprawdźmy, czy wszystkie liczby są większe od 0 i całkowite
const allLargerInteger1 = numbers.every(x => x > 0) && numbers.every(Number.isInteger);
const allLargerInteger2 = numbers.every(x => x > 0 && Number.isInteger(x));
// wypiszmy wynik
console.log(allLargerInteger1, allLargerInteger2); // false, false

// sprawdźmy, czy wszystkie liczby są nieujemne i mniejsze od 10
const allPositiveSmaller1 = numbers.every(x => Math.abs(x) === x) && numbers.every(x => x < 10);
const allPositiveSmaller2 = numbers.every(x => Math.abs(x) === x && x < 10);
// wypiszmy wynik
console.log(allPositiveSmaller1, allPositiveSmaller2); // true, true

// sprawdźmy, czy istnieje liczba podzielna przez 2 lub podzielna przez 3
const anyDivisible1 = numbers.some(x => x % 2 === 0) || numbers.some(x => x % 3 === 0);
const anyDivisible2 = numbers.some(x => x % 2 === 0 || x % 3 === 0);
// wypiszmy wynik
console.log(anyDivisible1, anyDivisible2); // true, true

// sprawdźmy, czy istnieje liczba ujemna lub całkowita
const anyNegativeInteger1 = numbers.some(x => x < 0) || numbers.some(Number.isInteger);
const anyNegativeInteger2 = numbers.some(x => x < 0 || Number.isInteger(x));
// wypiszmy wynik
console.log(anyDivisible1, anyDivisible2); // true, true