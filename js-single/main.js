function single1(array, predicate) {
  // przefiltrowujemy kolekcję aby uzyskać elementy spełniające predykat
  // po czym sprawdzamy, czy dostaliśmy tylko jeden element
  return array.filter(predicate).length === 1;
}

function single2(array, predicate) {
  // zmienna gdzie zapiszemy, czy jakikolwiek element spełnił predykat
  let anyFulfilling = false;
  // iterujemy po wszystkich elementach tablicy
  for (const element of array) {
    // sprawdzamy czy element spełnia predykat
    const fulfills = predicate(element);
    // jeśli spełnia
    if (fulfills) {
      // ...i jednocześnie inny element też spełniał
      if (anyFulfilling) {
        // zwracamy fałsz
        return false;
      } else {
        // ...i żaden do tej pory nie spełnił
        // to ustawiamy, że już jakiś spełnił
        anyFulfilling = true;
      }
    }
  }
  // zwracamy, czy jakikolwiek element spełnił predykat
  return anyFulfilling;
}

// tablica z liczbami podzielnymi przez 15
const numbers = [15, 30, 45, 60];

// sprawdzamy, czy tylko jedna jest podzielna przez 2
console.log(
  single1(numbers, (x) => x % 2 === 0), // false
  single2(numbers, (x) => x % 2 === 0) // false
);

// sprawdzamy, czy jest tylko jedna mniejsza od 0
console.log(
  single1(numbers, (x) => x < 0), // false
  single2(numbers, (x) => x < 0) // false
);

// sprawdzamy, czy jest tylko jedna podzielna przez 9
console.log(
  single1(numbers, (x) => x % 9 === 0), // true
  single2(numbers, (x) => x % 9 === 0) // true
);