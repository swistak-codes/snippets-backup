// deklarujemy tablicę z 6 pierwszymi liczbami naturalnymi
const numbers = [0, 1, 2, 3, 4, 5];

// sprawdzamy, czy nie ma jakiejkolwiek niecałkowitej
const notSomeNotInteger = !numbers.some(x => !Number.isInteger(x));
// odwróćmy sytuację: sprawdzamy, czy wszystkie są całkowite
const allInteger = numbers.every(x => Number.isInteger(x));
// wypiszmy wyniki
console.log(notSomeNotInteger, allInteger); // true, true

// sprawdzamy, czy nie wszystkie są większe bądź równe od 0
const notAllLargerEqual = !numbers.every(x => x >= 0);
// odwróćmy: sprawdzamy, czy jakakolwiek jest mniejsza od 0
const someSmaller = numbers.some(x => x < 0);
// wypiszmy wyniki
console.log(notAllLargerEqual, someSmaller); // false, false