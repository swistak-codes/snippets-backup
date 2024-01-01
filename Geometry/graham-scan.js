// funkcja znajdująca punkt P0
function findStartingPoint(points) {
  // załóżmy, że na razie najmniejszym punktem będzie pierwszy punkt w tablicy
  let currentMinPoint = points[0];
  // iterujemy po wszystkich punktach
  for (const point of points) {
    if (point.y < currentMinPoint.y) {
      // zapamiętujemy punkt o mniejszej współrzędnej Y
      currentMinPoint = point;
    } else if (point.y === currentMinPoint.y) {
      // jeśli Y są równe, bierzemy pod uwagę, który ma mniejsze X
      if (point.x < currentMinPoint.x) {
        currentMinPoint = point;
      }
    }
  }
  // zwracamy znaleziony punkt P0
  return currentMinPoint;
}

// funkcja zwracająca posortowane punkty z odrzuceniem duplikatów
function sortPoints(points, p0) {
  // sortujemy punkty według kąta do P0
  // z racji, że sort() modyfikuje oryginalną tablicę, będziemy działać na kopii
  const sortedPoints = [...points].sort((a, b) => {
    // funkcja komparatora
    const angleA = Math.atan2(a.y - p0.y, a.x - p0.x);
    const angleB = Math.atan2(b.y - p0.y, b.x - p0.x);
    return angleA - angleB;
  });
  // uwaga na boku: od NodeJS 20 możemy użyć funkcję toSorted(), aby nie kopiować tablicy
  // tablica w której zachowamy punkty po odfiltrowaniu
  const result = [];
  // iterujemy po punktach
  for (const point of sortedPoints) {
    if (result.length < 2) {
      // jeśli wynik nie ma co najmniej dwóch punktów, od razu dodajemy
      result.push(point);
    } else {
      // w przeciwnym razie sprawdzamy, czy ostatnio dodany punkt ma taki sam kąt
      // pobieramy ostatni punkt
      const lastPoint = result[result.length - 1];
      // wyliczamy jego kąt
      const lastAngle = Math.atan2(lastPoint.y - p0.y, lastPoint.x - p0.x);
      // wyliczamy kąt aktualnego punktu
      const currentAngle = Math.atan2(point.y - p0.y, point.x - p0.x);
      // propozycja optymalizacji: 
      // zapamiętywanie kąta dla każdego z punktów już na poziomie sortowania

      // jeśli kąty są takie same sprawdzamy odległość
      // porównujemy z zachowaniem marginesu błędu
      if (Math.abs(lastAngle - currentAngle) < Number.EPSILON) {
        // obliczamy odległość ostatniego punktu metryką Manhattan
        const lastDistance = Math.abs(lastPoint.x - p0.x) + Math.abs(lastPoint.y - p0.y);
        // obliczamy odległość aktualnego punktu
        const currentDistance = Math.abs(point.x - p0.x) + Math.abs(point.y - p0.y);
        if (currentDistance > lastDistance) {
          // jeśli aktualny punkt jest dalej, to podmieniamy punkty
          result[result.length - 1] = point;
        }
      } else {
        // jeśli kąty są różne, dodajemy po prostu punkt
        result.push(point);
      }
    }
  }
  // zwracamy tablicę punktów
  return result;
}

// funkcja sprawdzająca rodzaj kąta ułożonego z punktów A, B, C
function ccw(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
}

// funkcja zwracająca przedostatni element stosu, bez ściągania
function nextToTop(stack) {
  return stack[stack.length - 2];
  // ewentualnie: stack.at(-2)
}

// funkcja zwracająca ostatni element stosu, bez ściągania
function top(stack) {
  return stack[stack.length - 1];
  // ewentualnie: stack.at(-1)
}

// funkcja wykonująca algorytm Grahama
function grahamScan(points) {
  // jeśli nie mamy przynajmniej 2 punktów, to nie znajdziemy otoczki
  if (points.length < 2) {
    return [];
  }
  // znajdujemy punkt P0
  const p0 = findStartingPoint(points);
  // sortujemy punkty
  const sortedPoints = sortPoints(points, p0);
  // tworzymy stos
  const stack = [];
  // iterujemy po kolejnych punktach
  for (const point of sortedPoints) {
    // tak długo jak stos zawiera więcej niż 1 punkt i nie ma lewoskrętności
    // odrzucamy ostatni punkt ze stosu
    while (stack.length > 1 && ccw(nextToTop(stack), top(stack), point) <= 0) {
      stack.pop();
    }
    // dodajemy aktualny punkt na stos
    stack.push(point);
  }
  // zwracamy stos, który zawiera otoczkę wypukłą
  return stack;
}

// jeden punkt -> pusta otoczka
console.log(grahamScan([{ x: 0, y: 0 }]));
// dwa punkty -> odcinek jako otoczka
console.log(grahamScan([{ x: 0, y: 0 }, { x: 1, y: 1 }]));
// trzy punkty -> trójkąt
console.log(grahamScan([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]));
// cztery punkty -> otoczka trójkąt
console.log(grahamScan([{ x: 0, y: 0 }, { x: 0.2, y: 0.9 }, { x: 1, y: 1 }, { x: 0, y: 1 }]));