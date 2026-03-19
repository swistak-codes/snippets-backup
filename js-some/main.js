// tablica z liczbami podzielnymi przez 15
const numbers = [0, 15, 30, 45, 60];

// sprawdzamy, czy jest jakakolwiek parzysta
const isAnyEven = numbers.some(x => x % 2 === 0);
// wypisujemy wynik
console.log(isAnyEven); // true

// sprawdzamy, czy jakakolwiek nie jest l. całkowitą
const isAnyNonInteger = numbers.some(x => !Number.isInteger(x));
// wypisujemy wynik
console.log(isAnyNonInteger); // false