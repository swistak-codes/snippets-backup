function every(list, predicate) {
  // iterujemy po kolejnych elementach listy
  for (const element of list) {
    // sprawdzamy, czy predykat zwraca fałsz
    if (!predicate(element)) {
      // jeśli tak, zwracamy fałsz
      return false;
    }
  }
  // wszystkie elementy spełniają predykat
  return true;
}

function some(list, predicate) {
  // iterujemy po kolejnych elementach listy
  for (const element of list) {
    // sprawdzamy, czy predykat zwraca prawdę
    if (predicate(element)) {
      // jeśli tak, zwracamy prawdę
      return true;
    }
  }
  // żaden element nie spełnia predykatu
  return false;
}

const list = [1, 2, 3, 4, 5];
console.log(every(list, (value) => value % 2 === 0));
console.log(list.every((value) => value % 2 === 0));

console.log(some(list, (value) => value % 2 === 0));
console.log(list.some((value) => value % 2 === 0));