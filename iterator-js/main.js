// deklarujemy listę tablicową z trzema elementami
const list = ['1', '2-gi element', '3-ci'];
// wyciągamy iterator
const it = list[Symbol.iterator]();
// zmienna przechowująca aktualną wartość
let current = it.next();
// iterujemy tak długo, dopóki nie doszliśmy do końca
while (!current.done) {
  // wypisujemy wartość
  console.log(current.value);
  // pobieramy kolejną wartość
  current = it.next();
}