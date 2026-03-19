// generator zwracający pseudolosowe liczby według liniowego generatora kongruencyjnego
// seed to wartość początkowa generatora (ziarno)
// a, c, m to parametry generatora
function* lcgGenerator(seed, a = 1664525, c = 1013904223, m = 2 ** 32) {
  // zmienna pomocnicza do przechowywania kolejnych wartości
  // rozpoczynamy od ziarna
  let state = seed;
  // generujemy kolejne wartości w nieskończonej pętli
  while (true) {
    // obliczamy nową wartość
    state = (a * state + c) % m;
    // zwracamy wartość
    yield state;
  }
}

console.log("Inicjalizacja dużym ziarnem (675248)");
const generator = lcgGenerator(675248);
for (let i = 0; i < 5; i++) {
  console.log(generator.next().value);
}

console.log("Inicjalizacja zerowym ziarnem");
const generator2 = lcgGenerator(0);
for (let i = 0; i < 5; i++) {
  console.log(generator2.next().value);
}

console.log("Inicjalizacja błędnymi parametrami likwidującymi losowość");
const generator5 = lcgGenerator(0, 1, 1, 2 ** 32);
for (let i = 0; i < 5; i++) {
  console.log(generator5.next().value);
}
