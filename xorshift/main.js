// generator zwracający pseudolosowe liczby według algorytmu xorshift32
// seed to wartość początkowa generatora (ziarno)
function* xorshift32Generator(seed) {
  // zmienna pomocnicza do przechowywania kolejnych wartości
  // rozpoczynamy od ziarna
  let state = seed;
  // generujemy kolejne wartości w nieskończonej pętli
  while (true) {
    // przesuwamy bity w lewo o 13 i xorujemy
    let x = state ^ (state << 13);
    // przesuwamy bity w prawo o 17 i xorujemy
    // w JavaScript >>> to przesunięcie bitowe w prawo bez znaku
    x = x ^ (x >>> 17);
    // przesuwamy bity w lewo o 5 i xorujemy
    state = x ^ (x << 5);
    // zwracamy wartość jako liczbę całkowitą bez znaku
    // (>>> 0 to sposób w JS pozwalający na wymuszenie liczb całkowitych)
    yield state >>> 0;
  }
}

console.log("Inicjalizacja dużym ziarnem (675248)");
const generator = xorshift32Generator(675248);
for (let i = 0; i < 5; i++) {
  console.log(generator.next().value);
}

console.log("Inicjalizacja zerowym ziarnem");
const generator2 = xorshift32Generator(0);
for (let i = 0; i < 5; i++) {
  console.log(generator2.next().value);
}
