// tablica z liczbami podzielnymi przez 15
const numbers = [0, 15, 30, 45, 60];

// sprawdzamy, czy wszystkie są parzyste
const areEven = numbers.every(x => x % 2 === 0);
// wypisujemy wynik
console.log(areEven); // false

// sprawdzamy, czy wszystkie są l. całkowitymi
const areInteger = numbers.every(Number.isInteger);
// wypisujemy wynik
console.log(areInteger); // true
