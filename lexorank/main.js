// pomocnicze funkcje do konwersji między systemami liczbowymi
function toBase36(number) {
  return number.toString(36);
}
function fromBase36(base36) {
  return parseInt(base36, 36);
}

// dla uproszczenia obliczamy sobie wstępnie ranking środkowy
const MIDDLE = toBase36(Math.trunc(fromBase36("zzzzzz") / 2));
// stała wartość dodawana między kolejnymi elementami
const STEP = 8;

// tablica rankingowanych elementów
// zakładamy, że każdy element to obiekt z polem `rank`
let elements = [];

// uwaga — jeśli masz zapamiętaną tablicę w posortowanej wersji,
// to wystarczy sprawdzić jedynie ostatni element i dodać do niego STEP;
// poniższa implementacja zakłada, że nie mamy dostępu do posortowanych danych
function getNextRank() {
  // jeśli nie ma elementów, to zwracamy środkową wartość jako ranking
  if (elements.length === 0) {
    return MIDDLE;
  }
  // szukamy maksymalnej wartości rankingu
  let rank = 0;
  for (let i = 0; i < elements.length; i++) {
    // przypisujemy większą wartość rankingu
    // pamiętajmy o konwersji z systemu dziesiętnego na system 36
    rank = Math.max(rank, fromBase36(elements[i].rank));
  }
  // zwracamy ranking o STEP większy niż ostatni
  // również tutaj pamiętamy o konwersji między systemami liczbowymi
  return toBase36(rank + STEP);
}

// podobnie jak poprzednio, można tutaj prościej rozwiązać mając dostęp do posortowanych danych
function getFirstRank() {
  // jeśli nie ma elementów, to zwracamy środkową wartość jako ranking
  if (elements.length === 0) {
    return MIDDLE;
  }
  // szukamy minimalnej wartości rankingu
  let rank = Infinity;
  for (let i = 0; i < elements.length; i++) {
    // przypisujemy mniejszą wartość rankingu
    // pamiętajmy o konwersji z systemu dziesiętnego na system 36
    rank = Math.min(rank, fromBase36(elements[i].rank));
  }
  // zwracamy ranking o STEP mniejszy niż pierwszy
  // również tutaj pamiętamy o konwersji między systemami liczbowymi
  return toBase36(rank - STEP);
}

// a i b to obiekty z polem `rank`
// uwaga - nie sprawdzamy, czy a i b faktycznie ze sobą sąsiadują
function getRankBetween(a, b) {
  // konwertujemy rankingi na system dziesiętny
  const aRank = fromBase36(a.rank);
  const bRank = fromBase36(b.rank);
  // obliczamy średnią rankingów, podzieloną całkowitoliczbowo
  const avg = Math.trunc((aRank + bRank) / 2);
  // zwracamy ranking w systemie 36
  return toBase36(avg);
}

// funkcja wykonująca rebalans
// uwaga! w tej implementacji ignoruję istnienie koszyków
function rebalance() {
  // najpierw musimy posortować dane w kolejności rosnącej
  const sortedElements = elements.toSorted((a, b) =>
    a.rank.localeCompare(b.rank),
  );
  // nadajemy pierwszemu elementowi ranking środkowy
  sortedElements[0].rank = MIDDLE;
  // nadajemy kolejnym elementom nowe rankingi
  for (let i = 1; i < sortedElements.length; i++) {
    // nowy ranking to ranking poprzedniego elementu +STEP
    const prevRank = fromBase36(sortedElements[i - 1].rank);
    const newRank = toBase36(prevRank + STEP);
    // nadajemy elementowi nowy ranking
    sortedElements[i].rank = newRank;
  }
  // zwracamy nową tablicę elementów
  return sortedElements;
}

console.log("Dodajemy kilka nowych elementów");
for (let i = 0; i < 5; i++) {
  elements.push({ rank: getNextRank() });
}
console.log(elements);
console.log("Przesuwamy ostatni element pomiędzy 2 a 3");
elements[4].rank = getRankBetween(elements[2], elements[3]);
console.log(elements);
console.log("Posortujemy dane, aby sprawdzić czy wszystko działa");
elements.sort((a, b) => a.rank.localeCompare(b.rank));
console.log(elements);
console.log("Przesuwamy pierwszy element pomiędzy 2 a 3");
elements[1].rank = getRankBetween(elements[2], elements[3]);
console.log(elements);
console.log("Ponownie posortujemy dane, aby sprawdzić czy wszystko działa");
elements.sort((a, b) => a.rank.localeCompare(b.rank));
console.log(elements);
console.log("Przesuńmy ostatni element na początek");
elements[4].rank = getFirstRank();
console.log(elements);
console.log("Dodajmy jeszcze 2 elementy");
for (let i = 0; i < 2; i++) {
  elements.push({ rank: getNextRank() });
}
console.log(elements);
console.log("Przenieśmy oba te elementy na początek");
elements[5].rank = getFirstRank();
elements[6].rank = getFirstRank();
console.log(elements);
console.log("Ponownie posortujemy dane, aby sprawdzić czy wszystko działa");
elements.sort((a, b) => a.rank.localeCompare(b.rank));
console.log(elements);
console.log("Wykonajmy rebalans");
elements = rebalance();
console.log(elements);
