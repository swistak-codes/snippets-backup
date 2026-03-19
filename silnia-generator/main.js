function* factorial() {
  let result = 1n;
  let i = 1n;
  while (true) {
    result *= i;
    yield result;
    i++;
  }
}

const iterator = factorial();
let i = 0n;
while (true) {
  const start = performance.now();
  const result = iterator.next();
  const end = performance.now();
  console.log(`${i}, Result: ${result.value}, Time taken: ${end - start} ms`);
  i++;
}
