// generator zwracający pseudolosowe liczby według permutowanego generatora kongruencyjnego
// seed to wartość początkowa generatora (ziarno)
// a, c to parametry generatora LCG
function* pcgXshRrGenerator(
  seed,
  a = 6364136223846793005n,
  c = 1442695040888963407n,
) {
  // zmienna pomocnicza do przechowywania kolejnych wartości
  // rozpoczynamy od ziarna
  let state = BigInt(seed);
  // generujemy kolejne wartości w nieskończonej pętli
  while (true) {
    // zapisujemy poprzedni stan
    const oldState = state;
    // obliczamy nowy stan z 64-bitowego LCG
    state = (oldState * BigInt(a) + BigInt(c)) & 0xffffffffffffffffn;
    // wykonujemy xorshift
    const xorShifted = ((oldState >> 18n) ^ oldState) >> 27n;
    const rot = Number(oldState >> 59n);
    // obliczamy wartość po rotacji
    const result =
      (Number(xorShifted) >>> rot) | (Number(xorShifted) << (-rot & 31));
    // zwracamy wartość
    yield result >>> 0;
  }
}

console.log("Inicjalizacja dotychczasowym dużym ziarnem (675248)");
const generator = pcgXshRrGenerator(675248);
for (let i = 0; i < 5; i++) {
  console.log(generator.next().value);
}

console.log("Inicjalizacja zerowym ziarnem");
const generator2 = pcgXshRrGenerator(0);
for (let i = 0; i < 5; i++) {
  console.log(generator2.next().value);
}

console.log("Inicjalizacja prawdziwie dużym ziarnem (0x4d595df4d0f33173)");
const generator3 = pcgXshRrGenerator(0x4d595df4d0f33173n);
for (let i = 0; i < 5; i++) {
  console.log(generator3.next().value);
}
