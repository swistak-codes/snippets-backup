const effort = {
  q: 3.0,
  w: 2.5,
  e: 2.1,
  r: 2.3,
  t: 2.6,
  y: 3.4,
  u: 2.2,
  i: 2.0,
  o: 2.4,
  p: 3.0,
  a: 1.6,
  s: 1.3,
  d: 1.1,
  f: 1.0,
  g: 2.9,
  h: 2.9,
  j: 1.0,
  k: 1.1,
  l: 1.3,
  z: 3.5,
  x: 3.0,
  c: 2.7,
  v: 2.2,
  b: 3.7,
  n: 2.2,
  m: 1.8,
  alt: 2.0,
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

function typingEffort(word) {
  // zmienna przechowująca wynik
  let result = 0;
  // ddla uproszczenia zamieniamy wszystkie litery na małe
  word = word.toLowerCase();
  // iterujemy po kolejnych słowach
  for (let i = 0; i < word.length; i++) {
    // pobieramy literę
    let char = word[i];
    // sprawdzamy, czy jest znakiem diakrytycznym
    if (char in diacritics) {
      // jeśli tak, to zamieniamy ją na odpowiednik bez diakrytyki
      // oraz dodajemy do wyniku trudność pisania znaku diakrytycznego
      char = diacritics[char];
      result += effort["alt"];
    }
    // dodajemy do wyniku trudność pisania znaku
    result += effort[char];
  }
  // zwracamy wynik
  return result;
}

console.log(`Asdf: ${typingEffort("asdf")}; ${typingEffort("asdf") / 4}`);
console.log(`Las: ${typingEffort("las")}; ${typingEffort("las") / 3}`);
console.log(`Piłka: ${typingEffort("piłka")}; ${typingEffort("piłka") / 5}`);
console.log(
  `Chrząszcz: ${typingEffort("chrząszcz")}; ${typingEffort("chrząszcz") / 9}`,
);
console.log(`Odejść: ${typingEffort("odejść")}; ${typingEffort("odejść") / 6}`);
console.log(
  `Programmer: ${typingEffort("programmer")}; ${typingEffort("programmer") / 10}`,
);
console.log(
  `Javascript: ${typingEffort("javascript")}; ${typingEffort("javascript") / 10}`,
);
