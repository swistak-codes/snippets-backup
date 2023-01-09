function reduce(list, initialValue, action) {
  // inicjujemy akumulator odgórnie zadaną wartością
  let acc = initialValue;
  // iterujemy po kolejnych elementach listy
  for (const element of list) {
    // akumulatorowi przypisujemy wartość zwróconą przez akcję
    acc = action(acc, element)
  }
  // zwracamy wartość akumulatora
  return acc;
}

const list = [1, 2, 3, 4, 5];
console.log(reduce(list, 1, (accumulator, value) => accumulator * value));
console.log(list.reduce((accumulator, value) => accumulator * value, 1));