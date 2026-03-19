// krok, co ile wartości przeskakujemy
const STEP = 1000;
// tablica rankingowanych elementów
// zakładamy, że każdy element to obiekt z polem `rank`
let elements = [];

// uwaga — jeśli masz zapamiętaną tablicę w posortowanej wersji,
// to wystarczy sprawdzić jedynie ostatni element i dodać do niego STEP;
// poniższa implementacja zakłada, że nie mamy dostępu do posortowanych danych
function getNextRank() {
  // szukamy maksymalnej wartości rankingu
  let rank = 0;
  for (let i = 0; i < elements.length; i++) {
    // przypisujemy większą wartość rankingu
    rank = Math.max(rank, elements[i].rank);
  }
  // zwracamy ranking o STEP większy niż ostatni
  return rank + STEP;
}

// podobnie jak poprzednio, można tutaj prościej rozwiązać mając dostęp do posortowanych danych
function getFirstRank() {
  // jeśli nie ma elementów, to zwracamy STEP jako ranking
  if (elements.length === 0) {
    return STEP;
  }
  // szukamy minimalnej wartości rankingu
  let rank = Infinity;
  for (let i = 0; i < elements.length; i++) {
    // przypisujemy mniejszą wartość rankingu
    rank = Math.min(rank, elements[i].rank);
  }
  // zwracamy wynik całkowitoliczbowego dzielenia rank przez 2
  return Math.trunc(rank / 2);
}

// a i b to obiekty z polem `rank`
// uwaga - nie sprawdzamy, czy a i b faktycznie ze sobą sąsiadują
function getRankBetween(a, b) {
  // zwracamy średnią rankingów, podzieloną całkowitoliczbowo
  return Math.trunc((a.rank + b.rank) / 2);
}

function getMinDistance() {
  // jeśli nie ma elementów, to zwracamy nieskończoność
  if (elements.length === 0) {
    return Infinity;
  }
  // najpierw musimy posortować dane w kolejności rosnącej
  const sortedElements = elements.toSorted((a, b) => a.rank - b.rank);
  // szukamy minimalnej wartości odległości
  let distance = Infinity;
  for (let i = 0; i < sortedElements.length; i++) {
    // bierzemy ranking poprzedniego elementu
    // jeśli aktualnie sprawdzamy pierwszy, to poprzedni ranking wynosi 0
    const prevRank = i > 0 ? sortedElements[i - 1].rank : 0;
    // bierzemy ranking aktualnego elementu
    const currentRank = sortedElements[i].rank;
    // liczymy odległość między rankingami
    const currentDistance = currentRank - prevRank;
    distance = Math.min(distance, currentDistance);
  }
  // zwracamy ile elementów jeszcze możemy wstawić na najbardziej zajętą pozycję
  return Math.ceil(Math.log2(distance));
}

function rebalance() {
  // najpierw musimy posortować dane w kolejności rosnącej
  const sortedElements = elements.toSorted((a, b) => a.rank - b.rank);
  // nadajemy kolejnym elementom nowe rankingi
  for (let i = 0; i < sortedElements.length; i++) {
    // nowy ranking to indeks elementu +1 przemnożony przez STEP
    sortedElements[i].rank = (i + 1) * STEP;
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
elements.sort((a, b) => a.rank - b.rank);
console.log(elements);
console.log("Przesuwamy pierwszy element pomiędzy 2 a 3");
elements[1].rank = getRankBetween(elements[2], elements[3]);
console.log(elements);
console.log("Ponownie posortujemy dane, aby sprawdzić czy wszystko działa");
elements.sort((a, b) => a.rank - b.rank);
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
elements.sort((a, b) => a.rank - b.rank);
console.log(elements);
console.log("Pozostało miejsc w krytycznym miejscu:", getMinDistance());
console.log("Wykonajmy więc rebalans");
elements = rebalance();
console.log(elements);
