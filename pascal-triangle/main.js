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

// funkcja wypisująca w konsoli trójkąt Pascala
function printPascal(n) {
  // obliczamy trójkąt Pascala
  const triangle = pascal(n);
  // znajdujemy najdłuższą liczbę w trójkącie
  // dzięki temu będziemy wiedzieć, jak bardzo musimy rozsuwać krótsze liczby
  let maxLength = 0;
  for (let i = 0; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      maxLength = Math.max(maxLength, triangle[i][j].toString().length);
    }
  }
  // maksymalny odstęp między liczbami
  // mnożę przez 2 dla lepszego rezultatu wizualnego
  const space = maxLength * 2;
  // rozpoczynamy wypisywanie wiersz po wierszu
  for (let i = 0; i < triangle.length; i++) {
    // wiersz, który wypiszemy przechowamy w zmiennej row
    // od razu dodajemy odpowiednią liczbę spacji w zależności od wiersza
    let row = " ".repeat(((n - i) * space) / 2);
    // wypisujemy każdą liczbę w wierszu do zmiennej row
    for (let j = 0; j < triangle[i].length; j++) {
      // dodajemy liczbę do wiersza z odpowiednim odstępem
      row +=
        triangle[i][j].toString().padStart(maxLength, " ") +
        " ".repeat(maxLength);
      // co się tu dzieje po kolei:
      // toString() <- zamieniamy liczbę na string
      // padStart() <- dodajemy tyle spacji na początku,
      // aby liczba razem ze spacjami miała długość równą maxLength
      // repeat() <- na koniec dodajemy tyle spacji, co długość najdłuższej liczby
    }
    // wypisujemy wiersz w konsoli
    console.log(row);
  }
}

printPascal(9);
