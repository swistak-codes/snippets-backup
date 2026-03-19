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

// stałe parametry modelu
const kb = 0.3555;
const kp = 0.6423;
const ks = 0.4258;
const k1 = 1;
const k2 = 0.367;
const k3 = 0.235;
const w0 = 0;
const wh = 1;
const wr = 1.3088;
const wf = 2.5948;
const Ph = [0, 0];
const Prh = 0;
const Pru = 0.5;
const Prb = 1;
const Pf = [0, 0, 0.5, 1, 0, 0, 0, 0, 0.5, 1];
const fh = 1;
const fr = 0.3;
const ff = 0.3;

const letterMap = {
  q: { effort: 2.0, finger: 0, hand: 0, row: 0 },
  w: { effort: 2.0, finger: 1, hand: 0, row: 0 },
  e: { effort: 2.0, finger: 2, hand: 0, row: 0 },
  r: { effort: 2.0, finger: 3, hand: 0, row: 0 },
  t: { effort: 2.5, finger: 3, hand: 0, row: 0 },
  y: { effort: 3.0, finger: 6, hand: 1, row: 0 },
  u: { effort: 2.0, finger: 6, hand: 1, row: 0 },
  i: { effort: 2.0, finger: 7, hand: 1, row: 0 },
  o: { effort: 2.0, finger: 8, hand: 1, row: 0 },
  p: { effort: 2.0, finger: 9, hand: 1, row: 0 },
  a: { effort: 0.0, finger: 0, hand: 0, row: 1 },
  s: { effort: 0.0, finger: 1, hand: 0, row: 1 },
  d: { effort: 0.0, finger: 2, hand: 0, row: 1 },
  f: { effort: 0.0, finger: 3, hand: 0, row: 1 },
  g: { effort: 2.0, finger: 3, hand: 0, row: 1 },
  h: { effort: 2.0, finger: 6, hand: 1, row: 1 },
  j: { effort: 0.0, finger: 6, hand: 1, row: 1 },
  k: { effort: 0.0, finger: 7, hand: 1, row: 1 },
  l: { effort: 0.0, finger: 8, hand: 1, row: 1 },
  z: { effort: 2.0, finger: 0, hand: 0, row: 2 },
  x: { effort: 2.0, finger: 1, hand: 0, row: 2 },
  c: { effort: 2.0, finger: 2, hand: 0, row: 2 },
  v: { effort: 2.0, finger: 3, hand: 0, row: 2 },
  b: { effort: 3.5, finger: 3, hand: 0, row: 2 },
  n: { effort: 2.0, finger: 6, hand: 1, row: 2 },
  m: { effort: 2.0, finger: 7, hand: 1, row: 2 },
  // alt: { effort: 2.0, finger: 4, hand: 0, row: 3 },
};

// funkcja dzieląca słowo na triady
function triadSplit(word) {
  // tablica w której przechowamy wynik
  const triads = [];
  // dla uproszczenia usuwamy znaki diakrytyczne za pomocą wyrażenia regularnego
  word = word.replace(
    new RegExp(`[${Object.keys(diacritics).join("")}]`, "g"),
    (match) => diacritics[match],
  );
  // iterujemy po kolejnych literach słowa, pomijając dwie ostatnie
  for (let i = 0; i < word.length - 2; i++) {
    // dodajemy do tablicy triadę od aktualnego znaku do znaku + 3
    triads.push([...word.substring(i, i + 3)]);
  }
  // zwracamy tablicę z triadami
  return triads;
}

// funkcja obliczająca komponent bazowy wysiłku
function baseComponent(triad) {
  const bi1 = letterMap[triad[0]].effort;
  const bi2 = letterMap[triad[1]].effort;
  const bi3 = letterMap[triad[2]].effort;
  return k1 * bi1 * (1 + k2 * bi2 * (1 + k3 * bi3));
}

// funkcja obliczająca komponent kary wysiłku
function penaltyComponent(triad) {
  const pi1 =
    w0 + wh * Ph[letterMap[triad[0]].hand] + Pf[letterMap[triad[0]].finger];
  const pi2 =
    w0 + wh * Ph[letterMap[triad[1]].hand] + Pf[letterMap[triad[1]].finger];
  const pi3 =
    w0 + wh * Ph[letterMap[triad[2]].hand] + Pf[letterMap[triad[2]].finger];
  return k1 * pi1 * (1 + k2 * pi2 * (1 + k3 * pi3));
}

// funkcja obliczająca koszt czynnika ręki dla komponentu ścieżki
function handPath(triad) {
  // pobieramy, które ręce używamy do wpisywania kolejnych liter
  const hands = triad.map((letter) => letterMap[letter].hand);
  // jeśli używamy tej samej ręki dla wszystkich liter zwracamy 2
  if (hands[0] === hands[1] && hands[1] === hands[2]) {
    return 2;
  }
  // jeśli używamy rąk na przemian, zwracamy 1
  if (hands[0] !== hands[1] && hands[1] !== hands[2]) {
    return 1;
  }
  // w pozostałych przypadkach zwracamy 0
  return 0;
}

// funkcja obliczająca koszt czynnika rzędu dla komponentu ścieżki
function rowPath(triad) {
  // pobieramy, które rzędy używamy do wpisywania kolejnych liter
  const rows = triad.map((letter) => letterMap[letter].row);
  // usuwamy duplikaty z listy rzędów dla uproszczenia następnych obliczeń
  const uniqueRows = [...new Set(rows)];
  // jeśli używamy tylko jednego rzędu zwracamy 0
  if (uniqueRows.length === 1) {
    return 0;
  }
  // zróbmy posortowane kopię tablicy rzędów, również dla uproszczenia obliczeń
  // będziemy je trzymać jako stringi, bo łatwiej porównywać
  const ascSortedRows = [...rows].sort((a, b) => a - b).join("");
  const descSortedRows = [...rows].sort((a, b) => b - a).join("");
  const rowsString = rows.join("");
  // jeśli schodzimy w dół z powtórzeniami, zwracamy 1
  if (ascSortedRows === rowsString && uniqueRows.length !== rows.length) {
    return 1;
  }
  // jeśli przechodzimy w górę z powtórzeniami, zwracamy 2
  if (descSortedRows === rowsString && uniqueRows.length !== rows.length) {
    return 2;
  }
  // jeśli schodzimy w dół bez powtórzeń, zwracamy 4
  if (ascSortedRows === rowsString && uniqueRows.length === rows.length) {
    return 4;
  }
  // jeśli przechodzimy w górę bez powtórzeń, zwracamy 6
  if (descSortedRows === rowsString && uniqueRows.length === rows.length) {
    return 6;
  }
  // obliczmy różnice między kolejnymi rzędami
  const diffs = rows.map((row, i) => row - rows[i + 1]).slice(0, -1);
  // jeśli maksymalna różnica między rzędami jest równa 1, zwracamy 3
  // uwaga! interesuje nas tutaj wartość bezwzględna, bo różnica może być ujemna
  if (Math.max(...diffs.map((diff) => Math.abs(diff))) === 1) {
    return 3;
  }
  // jeśli największa różnica idąc w dół jest większa od 1 zwracamy 5, jeśli idąc w górę zwracamy 7
  if (Math.min(...diffs) < -1 && Math.max(...diffs) < 2) {
    return 5;
  }
  return 7;
}

// funkcja obliczająca koszt czynnika palców dla komponentu ścieżki
function fingerPath(triad) {
  // pobieramy, które palce używamy do wpisywania kolejnych liter
  // dla uproszczenia obliczeń, zmieńmy indeksowanie i pomińmy palce 4 i 5 (kciuki)
  const fingers = triad.map((letter) => {
    const finger = letterMap[letter].finger;
    return finger < 4 ? finger : finger - 2;
  });
  // usuwamy duplikaty z listy palców dla uproszczenia następnych obliczeń
  const uniqueFingers = [...new Set(fingers)];
  // dodatkowo usuńmy też duplikaty liter z triady
  const uniqueLetters = [...new Set(triad)];
  // jeśli używamy tego samego palca i powtarzamy literę, zwracamy 5
  if (uniqueFingers.length === 1 && uniqueLetters.length !== triad.length) {
    return 5;
  }
  // jeśli używamy tego samego palca i nie powtarzamy litery, zwracamy 7
  if (uniqueFingers.length === 1 && uniqueLetters.length === triad.length) {
    return 7;
  }
  // zróbmy posortowane kopię tablicy palców, również dla upraszczenia obliczeń
  const ascSortedFingers = [...fingers].sort((a, b) => a - b).join("");
  const descSortedFingers = [...fingers].sort((a, b) => b - a).join("");
  const fingersString = fingers.join("");
  // jeśli wszystkie palce są różne, ale ruch jest monotoniczny, zwracamy 0
  if (
    uniqueFingers.length === triad.length &&
    (ascSortedFingers === fingersString || descSortedFingers === fingersString)
  ) {
    return 0;
  }
  // jeśli powtarzamy literę, ale ruch jest monotoniczny, zwracamy 1
  if (
    uniqueLetters.length !== triad.length &&
    (ascSortedFingers === fingersString || descSortedFingers === fingersString)
  ) {
    return 1;
  }
  // sprawdzamy czy wszystkie litery są na tej samej ręce
  const hands = triad.map((letter) => letterMap[letter].hand);
  const uniqueHands = [...new Set(hands)];
  const isSameHand = uniqueHands.length === 1;
  // jeśli używamy różnych palców tej samej ręki, ale ruch nie jest monotoniczny
  if (isSameHand && uniqueFingers.length === triad.length) {
    return 6;
  }
  // jeśli używamy różnych palców tej samej ręki z powtórzeniem litery
  if (isSameHand && uniqueLetters.length !== triad.length) {
    return 3;
  }
  // jeśli używamy różnych rąk (alternating hands)
  if (!isSameHand && uniqueLetters.length === triad.length) {
    return 2;
  }
  // jeśli używamy różnych rąk z powtórzeniem litery
  return 4;
}

// funkcja obliczająca komponent ścieżki
function pathComponent(triad) {
  const ph = handPath(triad);
  const pr = rowPath(triad);
  const pf = fingerPath(triad);
  return fh * ph + fr * pr + ff * pf;
}

// obliczamy koszt triady
function triadCost(triad) {
  const bi = baseComponent(triad);
  const pi = penaltyComponent(triad);
  const si = pathComponent(triad);
  return kb * bi + kp * pi + ks * si;
}

// funkcja obliczająca trudność wpisania słowa za pomocą modelu CarpalX
function carpalX(word) {
  // dzielimy słowo na triady
  const rawTriads = triadSplit(word);
  // jeśli słowo ma mniej niż 3 znaki, nie ma triad do obliczenia
  if (rawTriads.length === 0) {
    return 0;
  }
  // zliczamy wystąpienia każdej unikalnej triady
  const triads = {};
  for (const triad of rawTriads) {
    if (!triads[triad]) {
      triads[triad] = {
        count: 0,
        letters: triad,
      };
    }
    triads[triad].count++;
  }
  // obliczamy sumę ni * ei dla wszystkich unikalnych triad
  let totalCost = 0;
  for (const triad of Object.values(triads)) {
    const ni = triad.count; // liczba wystąpień triady
    const ei = triadCost(triad.letters); // koszt triady
    totalCost += ni * ei;
  }
  // normalizujemy przez całkowitą liczbę triad N
  const N = rawTriads.length;
  return totalCost / N;
}

console.log(`Asdf: ${carpalX("asdf")}`);
console.log(`Las: ${carpalX("las")}`);
console.log(`Piłka: ${carpalX("piłka")}`);
console.log(`Chrząszcz: ${carpalX("chrząszcz")}`);
console.log(`Odejść: ${carpalX("odejść")}`);
console.log(`Programmer: ${carpalX("programmer")}`);
console.log(`Javascript: ${carpalX("javascript")}`);
