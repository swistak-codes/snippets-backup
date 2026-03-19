// generator zwracający pseudolosowe liczby według metody środka kwadratu
// seed to wartość początkowa generatora (ziarno)
function* middleSquareGenerator(seed) {
  // zapsiujemy liczbę cyfr początkowej wartości
  // najprościej jest to zrobić przez konwersję na typ znakowy
  const digits = String(seed).length;
  // jeśli nie ma parzystej liczby cyfr, to rzucamy błąd - wymóg algorytmu
  if (digits % 2 !== 0) {
    throw new Error("Ziarno musi mieć parzystą liczbę cyfr");
  }
  // zmienna pomocnicza do przechowywania kolejnych wartości
  // rozpoczynamy od ziarna
  let state = seed;
  // generujemy kolejne wartości w nieskończonej pętli
  while (true) {
    // podnosimy aktualny stan do kwadratu
    // uwaga - w przypadku większych wartości początkowych warto skorzystać z typu BigInt
    const squared = state ** 2;
    // konwertujemy liczbę na ciąg znaków aby dopisać zera na przodzie, jeśli trzeba
    let result = squared.toString().padStart(digits * 2, "0");
    // wyciągamy środkowe n cyfr
    // najpierw znajdujemy, gdzie one się znajdują
    const start = Math.floor(result.length / 2 - digits / 2);
    const end = start + digits;
    // a tutaj je wyciągamy i konwertujemy z powrotem na liczbę
    state = parseInt(result.substring(start, end));
    // zwracamy wartość
    yield state;
  }
}

console.log("Inicjalizacja dużym ziarnem (675248)");
const generator = middleSquareGenerator(675248);
for (let i = 0; i < 5; i++) {
  console.log(generator.next().value);
}

console.log("Inicjalizacja ziarnem z krótkim okresem (57)");
const generator2 = middleSquareGenerator(57);
for (let i = 0; i < 5; i++) {
  console.log(generator2.next().value);
}

console.log("Inicjalizacja z ziarnem, gdzie jedna wartość się zapętli (99)");
const generator3 = middleSquareGenerator(99);
for (let i = 0; i < 5; i++) {
  console.log(generator3.next().value);
}

console.log("Inicjalizacja ziarnem, przy którym utkniemy na zerze (78)");
const generator4 = middleSquareGenerator(78);
for (let i = 0; i < 5; i++) {
  console.log(generator4.next().value);
}
