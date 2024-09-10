// funkcja obliczająca trójkąt Pascala
function pascal(n) {
  const triangle = [];
  for (let i = 0; i <= n; i++) {
    triangle.push([]);
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }
  return triangle;
}

// funkcja wypisująca w konsoli trójkąt Sierpińskiego
function printSierpinski(n) {
  const triangle = pascal(n);
  for (let i = 0; i < triangle.length; i++) {
    // dodajemy przed liczbą tyle spacji
    // ile wynosi szerokość trójkąta minus numer wiersza
    let row = " ".repeat(n - i);
    for (let j = 0; j < triangle[i].length; j++) {
      const value = triangle[i][j] % 3 === 0 ? " " : "*";
      row += value + " ";
    }
    console.log(row);
  }
}

printSierpinski(17);
