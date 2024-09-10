let recursions = -1;

// funkcja obliczająca współczynnik dwumianowy Newtona
function binom(n, k) {
  recursions++;
  if (k === 0 || k === n) {
    return 1;
  }
  return binom(n - 1, k) + binom(n - 1, k - 1);
}

function test(n, k) {
  console.log(n, k);
  recursions = -1;
  console.log("binom(n, k) = ", binom(n, k));
  console.log("wywołań rekurencyjnych: ", recursions);
}

test(5, 0); // wynik: 1
test(5, 1); // wynik: 5
test(5, 2); // wynik: 10
test(5, 4); // wynik: 5
test(10, 3); // wynik: 120
test(15, 4); // wynik: 1365
test(15, 11); // wynik: 1365
