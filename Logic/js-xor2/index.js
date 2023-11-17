const _ = require('lodash');

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// wypisujemy rezultat użycia funkcji _.xor()
console.log(_.xor(A, B));  // [ 1, 3, 2, 4 ]
console.log(_.xor(B, A));  // [ 2, 4, 1, 3 ]