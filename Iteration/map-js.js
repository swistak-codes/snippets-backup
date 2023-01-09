function map(list, action) {
  // tworzymy pustą listę tablicową
  const result = [];
  // iterujemy po kolejnych elementach listy
  for (const element of list) {
    // dodajemy do wyniku rezultat akcji
    result.push(action(element));
  }
  // zwracamy przetworzone elementy
  return result;
}

const list = [1, 2, 3, 4, 5];
console.log(map(list, (value) => value * value));
console.log(list.map((value) => value * value));