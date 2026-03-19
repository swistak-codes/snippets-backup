let multiplications = 0;

// funkcja obliczająca współczynnik dwumianowy Newtona
function binom(n, k) {
  let result = 1;
  const newK = Math.min(n - k, k);
  for (let i = 1; i <= newK; i++) {
    result = (result * (n - i + 1)) / i;
    multiplications++;
  }
  return result;
}

function test(n, k) {
  console.log(n, k);
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
