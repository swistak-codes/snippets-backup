// importujemy hrtime z modułu process
const { hrtime } = require("node:process");

function a(m, n) {
  const next = new Array(m + 1);
  const goal = new Array(m + 1);
  for (let i = 0; i < m + 1; i++) {
    next[i] = 0;
    goal[i] = 1;
  }
  goal[m] = -1;
  let value;
  do {
    value = next[0] + 1;
    let transferring = true;
    let mCurrent = 0;
    while (transferring) {
      if (next[mCurrent] === goal[mCurrent]) {
        goal[mCurrent] = value;
      } else {
        transferring = false;
      }
      next[mCurrent] = next[mCurrent] + 1;
      mCurrent++;
    }
  } while (next[m] !== n + 1);
  return value;
}

// funkcja przyjmuje jako argument dowolną funkcję i dowolną liczbę argumentów
function measure(func, ...args) {
  // pobieramy wskazanie czasu z odpowiedniego licznika
  const start = hrtime.bigint();
  // wykonujemy funkcję
  const result = func(...args);
  // ponownie pobieramy wskazanie czasu
  const end = hrtime.bigint();
  // odejmujemy czas końcowy od początkowego
  const time = end - start;
  // w tym momencie możesz zrobić co chcesz z pomiarem
  // ja go wypisuję w konsoli
  console.log(`Wynik: ${result}; czas: ${time} ns`);
}

measure(a, 1, 4);
measure(a, 2, 4);
measure(a, 3, 4);
measure(a, 4, 1);
