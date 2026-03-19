let loops = 0;

// funkcja obliczająca współczynnik dwumianowy Newtona
function binom(n, k) {
  const triangle = [];
  const newK = Math.min(k, n - k);
  for (let i = 0; i <= n; i++) {
    // dodajemy nowy wiersz do trójkąta
    triangle.push([]);
    for (let j = 0; j <= Math.min(i, newK); j++) {
      loops++;
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }
  return triangle[n][newK];
}

function test(n, k) {
  console.log(n, k);
  loops = 0;
  console.log("binom(n, k) = ", binom(n, k));
  console.log("powtórzeń pętli: ", loops);
}

test(5, 0); // wynik: 1
test(5, 1); // wynik: 5
test(5, 2); // wynik: 10
test(5, 4); // wynik: 5
test(10, 3); // wynik: 120
test(15, 4); // wynik: 1365
test(15, 11); // wynik: 1365
