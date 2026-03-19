function* fibonacci() {
  // "n" oznacza BigInt, czyli liczby całkowite bez ograniczenia zakresu
  let a = 0n;
  yield a;
  let b = 1n;
  yield b;
  // iterujemy nieskończenie, ale dzięki "yield", nie zawiesimy programu
  while (true) {
    let tmp = a;
    a = b;
    b = tmp + b;
    yield b;
  }
}

const iterator = fibonacci();

for (let i = 0; i < 100; i++) {
  // wypisujemy i-ty wyraz ciągu Fibonacciego
  console.log(i, iterator.next().value);
}