// funkcja zwracająca listę wszystkich wierzchołków
function getAllNodes(graph) {
  // wierzchołki to liczby od 0 do N, gdzie N to rozmiar macierzy
  return [...Array(graph.length).keys()];
}

// funkcja zwracająca sąsiadów wierzchołka
function getNeighbors(graph, node) {
  const result = [];
  // iterujemy po wierszu reprezentującym skąd dojdziemy ze wskazanego wierzchołka
  for (let i = 0; i < graph.length; i++) {
    const edge = graph[node][i];
    if (edge > 0) {
      result.push(i);
    }
  }
  return result;
}

// funkcja wypisująca cykl
function getCyclePath(stack, node) {
  // tworzymy dodatkowy stos
  const tempStack = [];
  // kopiujemy ścieżkę na dodatkowy stos
  let topNode;
  do {
    // ściągamy wierzchołek ze stosu
    topNode = stack.pop();
    // dodajemy go na dodatkowy stos
    tempStack.push(topNode);
  } while (topNode !== node)
  // wypisujemy ścieżkę
  const result = [];
  while (tempStack.length > 0) {
    // ściągamy wierzchołek z dodatkowego stosu
    const tempTopNode = tempStack.pop();
    // dodajemy wierzchołek do wypisywanej ścieżki
    result.push(tempTopNode);
    // przywracamy wierzchołek na oryginalny stos
    stack.push(tempTopNode);
  }
  // zapętlamy ścieżkę dla ładniejszego zobrazowania cyklu
  result.push(node);
  // zwracamy ścieżkę
  return result;
}

// funkcja przechodząca przez graf
// dodatkowy argument przechowa nam listę znalezionych cykli
// między wywołaniami rekurencyjnymi
function traverse(graph, stack, colors, result) {
  // pobieramy wierzchołek ze szczytu stosu, zostawiając go na nim
  const node = stack.at(-1);
  // iterujemy po wszystkich sąsiadach wierzchołka
  for (const neighbor of getNeighbors(graph, node)) {
    if (colors[neighbor] === 'GRAY') {
      // znaleźliśmy cykl, więc uzyskajmy jego ścieżkę
      result.push(getCyclePath(stack, neighbor))
    } else if (colors[neighbor] === 'WHITE') {
      // dodajemy wierzchołek do stosu
      stack.push(neighbor);
      // zmieniamy kolor wierzchołka na szary
      colors[neighbor] = 'GRAY';
      // wywołujemy rekurencyjnie DFS
      traverse(graph, stack, colors, result);
    }
  }
  // zmieniamy kolor wierzchołka na czarny
  colors[node] = 'BLACK'
  // ściągamy wierzchołek ze stosu
  stack.pop();
}

// właściwa funkcja wyszukująca cykle
function findCycles(graph) {
  // pobierzmy wszystkie wierzchołki grafu
  const nodes = getAllNodes(graph);
  // utwórzmy tablicę z mapą kolorów
  // od razu ustawimy wszystkim wierzchołkom biały kolor
  const colors = Array(nodes.length).fill('WHITE');
  // tworzymy pomocniczą strukturę na przechowanie wyniku
  const result = [];
  // iterujemy po wszystkich wierzchołkach
  for (const node of nodes) {
    if (colors[node] !== 'WHITE') {
      // ignorujemy przetworzone wierzchołki
      continue;
    }
    // tworzymy stos przechowujący eksplorowaną ścieżkę
    const stack = [node];
    // zmieniamy kolor wierzchołka na szary
    colors[node] = 'GRAY';
    // przechodzimy po grafie
    traverse(graph, stack, colors, result);
  }
  // zwracamy listę cykli
  return result;
}

// poniższy graf zawiera cykle: 1-2-3-4-1, 2-3-2, 5-5
const graph = [
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1]
]

console.log(findCycles(graph));