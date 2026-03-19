// deklarujemy tablicę z 6 pierwszymi liczbami naturalnymi
const numbers = [0, 1, 2, 3, 4, 5];

// sprawdzamy czy wszystkie liczby są podzielne przez 2
// `every` to funkcja w JS odpowiadająca kwantyfikatorowi ogólnemu
const allNotDivisible = !numbers.every(x => x % 2 === 0);
// teraz odwróćmy warunek stosując I prawo de Morgana
// sprawdzamy, czy jakakolwiek liczba jest niepodzielna przez 2
// `some` to funkcja w JS odpowiadająca kwantyfikatorowi szczegółowemu
const anyNotDivisible = numbers.some(x => x % 2 !== 0);

// wypiszmy wyniki
console.log(allNotDivisible, anyNotDivisible); // true, true

// sprawdzamy, czy nie istnieje liczba mniejsza od 0
const anyNotSmaller = !numbers.some(x => x < 0);
// odwracamy warunek stosując II prawo de Morgana
// sprawdźmy, czy wszystkie są większe od 0
const allLarger = numbers.every(x => x >= 0);
// `x >= 0` to to samo co `!(x < 0)`, a jest bardziej naturalnym zapisem

// wypiszmy wyniki
console.log(anyNotSmaller, allLarger); // true, true