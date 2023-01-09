function filter(list, predicate) {
  // tworzymy pustą listę tablicową
  const result = [];
  // iterujemy po kolejnych elementach listy
  for (const element of list) {
    // sprawdzamy, czy predykat zwraca prawdę
    if (predicate(element)) {
      // jeśli tak, dodajemy element do wyniku
      result.push(element)
    }
  }
  // zwracamy elementy spełniające predykat
  return result;
}

const list = [1, 2, 3, 4, 5];
console.log(filter(list, (value) => value % 2 === 0));
console.log(list.filter((value) => value % 2 === 0));