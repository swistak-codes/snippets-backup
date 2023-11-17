// tablica z 7 pierwszymi liczbami naturalnymi
const numbers = [0, 1, 2, 3, 4, 5, 6];

// sprawdźmy, czy wszystkie liczby są równe 0 lub różne od 0
// używamy tutaj prawa w złą stronę
const equalDiff1 = numbers.every(x => x === 0 || x !== 0);
const equalDiff2 = numbers.every(x => x === 0) || numbers.every(x => x !== 0);
// wypiszmy wyniki
console.log(equalDiff1, equalDiff2); // true, false

// sprawdźmy, czy wszystkie liczby są całkowite lub wszystkie są różne od 0
// tym razem prawo jest użyte w dobrą stronę
const integerDiff1 = numbers.every(Number.isInteger) || numbers.every(x => x !== 0);
const integerDiff2 = numbers.every(x => Number.isInteger(x) || x !== 0);
// wypiszmy wyniki
console.log(integerDiff1, integerDiff2); // true, true

// sprawdźmy, czy jest liczba równa 0 i liczba różna od 0
// ponownie, prawo jest użyte w złą stronę
const equalAndDiff1 = numbers.some(x => x === 0) && numbers.some(x => x !== 0);
const equalAndDiff2 = numbers.some(x => x === 0 && x !== 0);
// wypiszmy wyniki
console.log(equalAndDiff1, equalAndDiff2); // true, false

// sprawdźmy, czy jest liczba całkowita i różna od 0
// używamy prawo w dobrą stronę
const integerAndDiff1 = numbers.some(x => Number.isInteger(x) && x !== 0);
const integerAndDiff2 = numbers.some(x => Number.isInteger(x)) && numbers.some(x => x !== 0);
// wypiszmy wyniki
console.log(integerAndDiff1, integerAndDiff2); // true, true