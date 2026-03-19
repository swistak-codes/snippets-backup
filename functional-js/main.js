const list = [1, 2, 3, 4, 5];

// aplikacja zbiorowa podnosząca liczby do kwadratu
const squares = list.map(value => value * value);
console.log(squares); // [1, 4, 9, 16, 25]

// filtrowanie - zostawiamy tylko liczby parzyste
// zwróć uwagę, że list nie zostało zmienione!
const even = list.filter(value => value % 2 === 0);
console.log(even); // [ 2, 4 ]

// sprawdzenie, czy wszystkie spełniają predykat
// ponownie sprawdzimy parzystość
const allEven = list.every(value => value % 2 === 0);
console.log(allEven); // false

// sprawdzenie, czy cokolwiek spełnia predykat
const anyEven = list.some(value => value % 2 === 0);
console.log(anyEven); // true

// fold zwracający iloczyn elementów listy
// początkową wartość akumulatora ustawiamy na 1
const product = list.reduce((accumulator, value) => accumulator * value, 1);
console.log(product); // 120

// iteracja, w ramach której wypiszemy wszystkie elementy
const all = list.forEach(value => console.log(value));
// sprawdzamy, czy faktycznie nic nie zostało zwrócone
console.log(all); // undefined