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

function manhattanSimple(word) {
  // zmienna przechowująca wynik
  let result = 0;
  // ddla uproszczenia zamieniamy wszystkie litery na małe
  word = word.toLowerCase();
  // iterujemy po kolejnych słowach, po dwa na raz
  for (let i = 0; i < word.length - 1; i++) {
    // pobieramy dwie następujące po sobie litery
    let char1 = word[i];
    let char2 = word[i + 1];
    // sprawdzamy, czy któraś z nich jest znakiem diakrytycznym
    let char1Diacritic = false;
    let char2Diacritic = false;
    if (char1 in diacritics) {
      // jeśli tak, to zamieniamy ją na odpowiednik bez diakrytyki
      char1 = diacritics[char1];
      char1Diacritic = true;
    }
    if (char2 in diacritics) {
      char2 = diacritics[char2];
      char2Diacritic = true;
    }
    // dodajemy do wyniku odległość między tymi literami
    result +=
      Math.abs(layout[char1][0] - layout[char2][0]) +
      Math.abs(layout[char1][1] - layout[char2][1]);
    // jeśli jedna z liter była znakiem diakrytycznym, to dodajemy 1 do wyniku
    // jako ruch kciuka na klawisz Alt
    if (
      (char1Diacritic && !char2Diacritic) ||
      (!char1Diacritic && char2Diacritic)
    ) {
      result += 1;
    }
  }
  // zwracamy wynik
  return result;
}

console.log(`Asdf: ${manhattanSimple("asdf")}; ${manhattanSimple("asdf") / 4}`);
console.log(`Las: ${manhattanSimple("las")}; ${manhattanSimple("las") / 3}`);
console.log(
  `Piłka: ${manhattanSimple("piłka")}; ${manhattanSimple("piłka") / 5}`,
);
console.log(
  `Chrząszcz: ${manhattanSimple("chrząszcz")}; ${manhattanSimple("chrząszcz") / 9}`,
);
console.log(
  `Odejść: ${manhattanSimple("odejść")}; ${manhattanSimple("odejść") / 6}`,
);
console.log(
  `Programmer: ${manhattanSimple("programmer")}; ${manhattanSimple("programmer") / 10}`,
);
console.log(
  `Javascript: ${manhattanSimple("javascript")}; ${manhattanSimple("javascript") / 10}`,
);
