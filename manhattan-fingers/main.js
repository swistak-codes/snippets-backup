const layout = {
  q: [0, 0],
  w: [1, 0],
  e: [2, 0],
  r: [3, 0],
  t: [4, 0],
  y: [5, 0],
  u: [6, 0],
  i: [7, 0],
  o: [8, 0],
  p: [9, 0],
  a: [0, 1],
  s: [1, 1],
  d: [2, 1],
  f: [3, 1],
  g: [4, 1],
  h: [5, 1],
  j: [6, 1],
  k: [7, 1],
  l: [8, 1],
  ";": [9, 1],
  z: [0, 2],
  x: [1, 2],
  c: [2, 2],
  v: [3, 2],
  b: [4, 2],
  n: [5, 2],
  m: [6, 2],
};

const diacritics = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "x", // "x", bo "ź" piszemy używając "Alt + x"
  ż: "z",
};

const fingers = {
  q: 0,
  a: 0,
  z: 0,
  w: 1,
  s: 1,
  x: 1,
  e: 2,
  d: 2,
  c: 2,
  r: 3,
  f: 3,
  v: 3,
  t: 3,
  g: 3,
  b: 3,
  y: 4,
  h: 4,
  n: 4,
  u: 4,
  j: 4,
  m: 4,
  i: 5,
  k: 5,
  o: 6,
  l: 6,
  p: 7,
};

const startingPositions = [
  layout["a"],
  layout["s"],
  layout["d"],
  layout["f"],
  layout["j"],
  layout["k"],
  layout["l"],
  layout[";"],
];

function manhattanFingers(word) {
  // tablica przechowująca aktualne pozycje palców
  const fingerPositions = [...startingPositions];
  // zmienna przechowująca wynik
  let result = 0;
  // dla uproszczenia zamieniamy wszystkie litery na małe
  word = word.toLowerCase();
  // zmienne pomocnicze do określania ostatnich akcji
  let lastFinger = null;
  let lastDiacritic = false;
  // iterujemy po każdej literze w słowie
  for (let i = 0; i < word.length; i++) {
    // tym razem przyda nam się tylko jedna litera
    let letter = word[i];
    // sprawdzamy czy litera jest znakiem diakrytycznym
    let isDiacritic = false;
    if (letter in diacritics) {
      letter = diacritics[letter];
      isDiacritic = true;
    }
    // sprawdzamy, który palec powinien nacisnąć literę
    const finger = fingers[letter];
    // obliczamy odległość Manhattan z ostatniej pozycji palca do pozycji litery
    const fromPosition = fingerPositions[finger];
    const toPosition = layout[letter];
    result +=
      Math.abs(fromPosition[0] - toPosition[0]) +
      Math.abs(fromPosition[1] - toPosition[1]);
    // przenosimy palec na nową pozycję
    fingerPositions[finger] = toPosition;
    // jeśli litera jest znakiem diakrytycznym, a poprzedni nie był, dodajemy 1 do wyniku
    if (isDiacritic && !lastDiacritic) {
      result += 1;
      lastDiacritic = true;
    } else if (!isDiacritic) {
      lastDiacritic = false;
    }
    // jeśli palec się zmienił, przenosimy go na jego początkową pozycję
    if (lastFinger !== null && lastFinger !== finger) {
      fingerPositions[lastFinger] = startingPositions[lastFinger];
    }
    // zapamiętujemy ostatni palec
    lastFinger = finger;
  }
  // zwracamy wynik
  return result;
}

console.log(
  `Asdf: ${manhattanFingers("asdf")}; ${manhattanFingers("asdf") / 4}`,
);
console.log(`Las: ${manhattanFingers("las")}; ${manhattanFingers("las") / 3}`);
console.log(
  `Piłka: ${manhattanFingers("piłka")}; ${manhattanFingers("piłka") / 5}`,
);
console.log(
  `Chrząszcz: ${manhattanFingers("chrząszcz")}; ${manhattanFingers("chrząszcz") / 9}`,
);
console.log(
  `Odejść: ${manhattanFingers("odejść")}; ${manhattanFingers("odejść") / 6}`,
);
console.log(
  `Programmer: ${manhattanFingers("programmer")}; ${manhattanFingers("programmer") / 10}`,
);
console.log(
  `Javascript: ${manhattanFingers("javascript")}; ${manhattanFingers("javascript") / 10}`,
);
