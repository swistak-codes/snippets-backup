let multiplications = 0;

// funkcja obliczająca n!
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
    multiplications++;
  }
  return result;
}

// funkcja obliczająca współczynnik dwumianowy Newtona
function binom(n, k) {
  multiplications++;
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function test(n, k) {
  console.log(n, k);
  console.log("mianownik: ", factorial(k) * factorial(n - k));
  multiplications = 0;
  console.log("binom(n, k) = ", binom(n, k));
  console.log("mnożeń: ", multiplications);
}

test(5, 0); // wynik: 1
test(5, 1); // wynik: 5
test(5, 2); // wynik: 10
test(5, 4); // wynik: 5
test(10, 3); // wynik: 120
test(15, 4); // wynik: 1365
test(15, 11); // wynik: 1365
