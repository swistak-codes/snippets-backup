// tablica z dozwolonymi ruchami skoczka
const KNIGHT_MOVES = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: -1, y: 2 },
  { x: -2, y: 1 },
  { x: -1, y: -2 },
  { x: -2, y: -1 },
  { x: 1, y: -2 },
  { x: 2, y: -1 },
];

// funkcja wypisująca planszę
function prettyPrint(board) {
  for (const row of board) {
    console.log(row.map(x => x.toString().padStart(2, ' ')).join(' | '));
  }
}

// funkcja generująca pustą, kwadratową planszę
function generateBoard(size) {
  return [...Array(size)].map(_ => Array(size).fill(null));
}

// funkcja zwracająca nieodwiedzonych sąsiadów
function getUnvisitedNeighbours(coords, board) {
  // wyciągamy rozmiar planszy; zakładamy, że jest kwadratowa
  const boardSize = board.length;
  // zmienna, w której przechowamy wynik
  const result = [];
  // iterujemy po dozwolonych ruchach aby sprawdzić, który jest możliwy do wykonania
  for (const move of KNIGHT_MOVES) {
    // wyznaczamy współrzędne na jakich wyląduje skoczek po ruchu
    const newX = coords.x + move.x;
    const newY = coords.y + move.y;
    // sprawdzamy, czy zmienne są w zakresie tablicy; jeśli nie to kontynuujemy iterację
    if (newX < 0 || newX >= boardSize || newY < 0 || newY >= boardSize) {
      continue;
    }
    // sprawdzamy, czy pole nie jest zajęte; jeśli nie, dodajemy do zmiennej z wynikiem
    if (board[newY][newX] == null) {
      result.push({ x: newX, y: newY });
    }
  }
  // zwracamy wynik
  return result;
}

// funkcja zwracająca wierzchołek o najmniejszym stopniu
function getNodeWithMinDegree(nodes, board, recursionDepth) {
  // aktualny minimalny stopień
  let min = Number.POSITIVE_INFINITY;
  // lista wierzchołków o minimalnym stopniu
  let minCoords = [];
  // iterujemy po wszystkich wierzchołkach
  for (const node of nodes) {
    // pobieramy listę sąsiadów, interesuje nas tylko ich liczba
    const neighbors = getUnvisitedNeighbours(node, board).length;
    // jeśli liczba jest taka sama jak aktualne minimum, to dokładamy aktualny wierzchołek
    if (min === neighbors) {
      minCoords.push(node);
      // jeśli jest mniejsza, to podmieniamy aktualne minimum
    } else if (min > neighbors) {
      min = neighbors;
      minCoords = [node];
    }
  }
  // jeżeli nie znaleźliśmy żadnego minimum zwracamy błąd
  if (minCoords.length === 0) {
    throw Error("Ślepa uliczka!")
  }
  // jeśli tylko jeden wierzchołek ma minimalną wartość, zwracamy go
  if (minCoords.length === 1) {
    return minCoords[0];
  }
  // w tej sytuacji mamy remis, więc podejmujemy odpowiednie kroki:
  // jeśli nie jesteśmy za głęboko w rekursji, wywołujemy funkcję rekurencyjnie
  if (recursionDepth > 0) {
    return getNodeWithMinDegree(minCoords, board, recursionDepth - 1);
    // usuwając ten krok uzyskamy oryginalną metodę Warnsdorffa
  }
  // jeśli już zaszliśmy zbyt głęboko, losujemy wierzchołek
  return minCoords[Math.trunc(Math.random() * minCoords.length)];
}

// funkcja wyszukująca trasę skoczka
function findKnightsTour(boardSize, startCoords, recursionDepth) {
  // generujemy nową planszę
  let board = generateBoard(boardSize);
  // zmienna przechowująca aktualne pole na planszy
  let currentCoords = startCoords;
  // licznik ruchów
  let move = 0;
  // ustawiamy, że wierzchołek startowy jest juz odwiedzony
  board[currentCoords.y][currentCoords.x] = ++move;
  // iterujemy tak długo, póki są nieodwiedzone wierzchołki
  while (board.some(x => x.some(y => y == null))) {
    // pobieramy sąsiadów aktualnego wierzchołka
    const neighbors = getUnvisitedNeighbours(currentCoords, board);
    try {
      // wywołujemy znalezienie sąsiada o najniższym stopniu i przypisujemy go jako aktualny wierzchołek
      currentCoords = getNodeWithMinDegree(neighbors, board, recursionDepth);
    } catch (err) {
      // w przypadku błędu wypiszmy go i zwróćmy co zostało znalezione do tej pory
      console.error(err);
      return board;
    }
    // ustawiamy wierzchołek jako odwiedzony
    board[currentCoords.y][currentCoords.x] = ++move;
  }
  // zwracamy planszę
  return board;
}

prettyPrint(findKnightsTour(8, { x: 1, y: 0 }, 1));