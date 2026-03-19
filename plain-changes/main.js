// funkcja zwracająca wierzchołki połączone ze wskazanym
function getConnectedNodes(graph, node) {
  // wynik przechowamy w zbiorze aby uniknąć powtórzeń
  const result = new Set();
  // najpierw zbierzmy wierzchołki, do których dojdziemy ze wskazanego wierzchołka
  for (let i = 0; i < graph.length; i++) {
    const edge = graph[node][i];
    if (edge > 0) {
      result.add(i);
    }
  }
  // następnie wierzchołki z których dojdziemy do wskazanego
  for (let i = 0; i < graph.length; i++) {
    const edge = graph[i][node];
    if (edge > 0) {
      result.add(i);
    }
  }
  // zwracamy tablicę zbudowaną z elementów zbioru
  return [...result];
}

// funkcja zwracająca listę wszystkich wierzchołków
function getAllNodes(graph) {
  // wierzchołki to liczby od 0 do N, gdzie N to rozmiar macierzy
  return [...Array(graph.length).keys()];
}

function getSubgraphs(graph) {
  // lista zbiorów, w których będziemy trzymać wierzchołki
  const result = [];
  // zbiór odwiedzonych wierzchołków
  const visited = new Set();
  // iterujemy po wszystkich wierzchołkach
  for (const node of getAllNodes(graph)) {
    // jeśli odwiedziliśmy wierzchołek przechodzimy do kolejnego
    if (visited.has(node)) {
      continue;
    }
    // zbiór z aktualnym grafem
    const current = new Set();
    // odkrywamy graf za pomocą BFS
    const toVisit = [node];
    while (toVisit.length > 0) {
      // ściągamy pierwszy wierzchołek z kolejki
      const currentNode = toVisit.pop();
      // dodajemy wierzchołek do aktualnego grafu
      current.add(currentNode);
      // dodajemy wierzchołek do odwiedzonych
      visited.add(currentNode);
      // sprawdzamy sąsiadów wierzchołka
      for (const neighbor of getConnectedNodes(graph, currentNode)) {
        // jeżeli sąsiad nie był odwiedzony, dodajemy go do kolejki
        if (!visited.has(neighbor)) {
          toVisit.push(neighbor);
        }
      }
    }
    // dodajemy graf do wyniku
    result.push(current);
  }
  // zwracamy wynik
  return result;
}

// macierz sąsiedztwa zawiera 5 grafów:
// 2-0-1, 4-5, 6-7-8, 3, 9
const graph = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

console.log(getSubgraphs(graph));