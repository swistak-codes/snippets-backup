const { performance } = require("node:perf_hooks");
const fs = require("node:fs");

// funkcja do parsowania pliku .tsp
function parseTSP(fileContent) {
  const lines = fileContent.split("\n");
  const nodes = new Map();
  let isNodeSection = false;
  for (let line of lines) {
    line = line.trim();
    if (line === "NODE_COORD_SECTION") {
      isNodeSection = true;
      continue;
    }
    if (line === "EOF") {
      break;
    }
    if (isNodeSection) {
      const parts = line.split(/\s+/);
      if (parts.length === 3) {
        const nodeId = parseInt(parts[0]);
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        nodes.set(nodeId, { x, y });
      }
    }
  }
  return nodes;
}

// odczytujemy dane z pliku att48.tsp ze zbioru TSPLIB
// att48 zawiera współrzędne stolic 48 kontynentalnych stanów USA
// dla naszych testów będziemy używać jedynie wycinek danych
const data = fs.readFileSync("att48.tsp", "utf8");
const nodes = parseTSP(data);

// funkcja obliczająca odległość między dwoma wierzchołkami
// liczymy tutaj odległość zgodnie z instrukcją z TSPLIB
function distance(a, b) {
  const nodeA = nodes.get(a);
  const nodeB = nodes.get(b);
  if (!nodeA || !nodeB) {
    throw new Error(`Nie znaleziono wierzchołków ${a} i/lub ${b}`);
  }
  const xd = nodeA.x - nodeB.x;
  const yd = nodeA.y - nodeB.y;
  const rij = Math.sqrt((xd * xd + yd * yd) / 10.0);
  const tij = Math.round(rij);
  return tij < rij ? tij + 1 : tij;
}

let iterations = 0;

// algorytm Kruskala do znalezienia MST
function mst(nodes) {
  // lista wierzchołków
  const edges = [];
  // rekonstruujemy listę krawędzi (unikalne dla naszego problemu)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      iterations++;
      edges.push({
        from: nodes[i],
        to: nodes[j],
        weight: distance(nodes[i], nodes[j]),
      });
    }
  }
  // sortujemy krawędzie rosnąco według wag
  // skorzystamy z sortowania wbudowanego w JS, które zapewni złożoność O(n log n)
  edges.sort((a, b) => {
    iterations++;
    return a.weight - b.weight;
  });

  // do przechowania drzew będziemy używać struktury zbiorów rozłącznych (DSU)
  // do jej zrobienia wykorzystamy wbudowaną w JS strukturę Map
  // w tej mapie przechowamy mapowanie wierzchołka do jego rodzica w drzewie
  const parent = new Map();
  // a tutaj przybliżoną wysokość drzewa
  const rank = new Map();

  // funkcja szukająca korzenia drzewa, w którym znajduje się wierzchołek
  function find(node) {
    // jeśli parent.get(node) === node to node jest korzeniem drzewa
    if (parent.get(node) !== node) {
      // jeśli nie, to rekurencyjnie szukamy dalej korzenia
      // używamy set, ponieważ dokonujemy tzw. kompresji ścieżki, aby następne wyszukania były szybsze
      parent.set(node, find(parent.get(node)));
    }
    // zwracamy korzeń drzewa
    return parent.get(node);
  }
  // funkcja łącząca dwa drzewa w jedno
  function union(node1, node2) {
    // najpierw szukamy korzeni drzwa
    const root1 = find(node1);
    const root2 = find(node2);
    // jeśli faktycznie mamy do czynienia z oddzielnymi drzewami...
    if (root1 !== root2) {
      // teraz musimy zdecydować, który korzeń stanie się rodzicem drugiego
      // wykorzystamy do tego znane nam wysokości drzewa
      // chcemy zawsze podłączyć wyższe do niższego
      if (rank.get(root1) > rank.get(root2)) {
        parent.set(root2, root1);
      } else if (rank.get(root1) < rank.get(root2)) {
        parent.set(root1, root2);
      } else {
        // w tym przypadku nie ma znaczenia, które podłączymy do któego
        parent.set(root2, root1);
        // jednak musimy zwiększyć wysokość drzewa w tym przypadku
        rank.set(root1, rank.get(root1) + 1);
        // w pozostałych przypadkach nie ma to już znaczenia
        // ponieważ wysokość drzewa nie ulegnie zmianie
      }
    }
  }

  // wracamy do algorytmu Kruskala
  // w tym momencie inicjalizujemy las, tworząc jednoelementowe drzewa
  for (const node of nodes) {
    iterations++;
    parent.set(node, node);
    rank.set(node, 0);
  }
  // inicjalizujemy tablicę krawędzi opisujących MST
  const mst = [];
  // teraz przechodzimy po wszystkich krawędziach
  for (const edge of edges) {
    iterations++;
    // sprawdzamy, czy dana krawędź połączyłaby ze sobą dwa drzewa
    if (find(edge.from) !== find(edge.to)) {
      // jeśli tak, to dodajemy ją do MST
      mst.push(edge);
      // i aktualizujemy drzewa
      union(edge.from, edge.to);
    }
  }
  // zwracamy listę krawędzi drzewa
  return mst;
}

// funkcja znajdująca minimalne dopasowanie doskonałe
function perfectMatch(oddNodes) {
  // zmienna w której przechowamy wynikową listę krawędzi
  const result = [];
  // zbiór do którego będziemy odkładać wykorzystane już wierzchołki
  const used = new Set();
  // przeitetujemy po wszystkich wierzchołkach i poszukamy najbliższej do niego pary
  for (let i = 0; i < oddNodes.length; i++) {
    // sprawdzamy wierzchołek tylko wtedy, jeśli nie jest połączony w parę
    if (!used.has(oddNodes[i])) {
      // zmienne pomocnicze do szukania minimum
      let bestMatch = null;
      let bestDistance = Number.POSITIVE_INFINITY;
      // szukamy najbliższego wierzchołka z niepołączonych w pary
      for (let j = i + 1; j < oddNodes.length; j++) {
        iterations++;
        if (!used.has(oddNodes[j])) {
          let d = distance(oddNodes[i], oddNodes[j]);
          if (d < bestDistance) {
            bestDistance = d;
            bestMatch = oddNodes[j];
          }
        }
      }
      // po znalezieniu pary dodajemy ją do wyniku
      // oraz do listy wykorzystanych wierzchołków
      if (bestMatch !== null) {
        result.push({
          from: oddNodes[i],
          to: bestMatch,
          weight: bestDistance,
        });
        used.add(oddNodes[i]);
        used.add(bestMatch);
      }
    }
  }
  // zwracamy listę krawędzi
  return result;
}

// funkcja tworząca identyfikator krawędzi
function getEdgeId(node1, node2) {
  // mamy graf nieskierowany, więc musimy zapewnić kolejność zapisu wierzchołków
  return node1 < node2 ? `${node1}-${node2}` : `${node2}-${node1}`;
}

// funkcja znajdująca cykl Eulera
function getEulerianCircuit(multigraph) {
  // mapa, która będzie nam przechowywać listę sąsiedztwa
  const adjList = new Map();
  // oraz zbiór, w którym będziemy przechowywać odwiedzone krawędzie
  const visitedEdges = new Set();
  // najwygodniejszą strukturą grafową do algorytmu Fleury'ego
  // jest lista sąsiedztwa — do niej przekonwertujmy nasz multigraf
  // w tym celu musimy przeiterować po wszystkich krawędziach multigrafu
  // a jest on zapisany jako lista krawędzi
  for (const edge of multigraph) {
    iterations++;
    // jeśli nie mamy w mapie któregoś z wierzchołków, to tworzymy im puste listy
    if (!adjList.has(edge.from)) {
      adjList.set(edge.from, []);
    }
    if (!adjList.has(edge.to)) {
      adjList.set(edge.to, []);
    }
    // dodajemy krawędzie do list odpowiadających wierzchołkom
    adjList.get(edge.from).push(edge.to);
    adjList.get(edge.to).push(edge.from);
  }
  // zmienna, która przechowa nam rezultat algorytmu
  // uwaga! przechowamy kolejność odwiedzania wierzchołków, nie krawędzi
  // taki sposób będzie dla nas bardziej przydatny
  const result = [];
  // stos (jako tablica), gdzie przechowamy wierzchołki, które mamy odwiedzić
  // inicjujemy go od razu wierzchołkiem początkowym pierwszej krawędzi
  const stack = [multigraph[0].from];
  // w tym miejscu zaczyna się implementacja algorytmu Fleury'ego
  // wykonujemy go tak długo, jak na stosie mamy wciąż wierzchołki do odwiedzenia
  while (stack.length > 0) {
    iterations++;
    // pobieramy wierzchołek ze szczytu stosu
    // dla wygody, za szczyt uznajemy koniec tablicy
    const node = stack.at(-1);
    // zmienna, w której przechowamy informację, czy odwiedziliśmy krawędzie
    let hasVisited = false;
    // pobieramy listę krawędzi aktualnego wierzchołka
    const neighbors = adjList.get(node);
    // przechodzimy po wszystkich sąsiadujących wierzchołkach
    for (const next of neighbors) {
      // generujemy identyfikator krawędzi, aby sprawdzić w zbiorze czy jest odwiedzona
      const edgeId = getEdgeId(node, next);
      // sprawdzamy, czy krawędź nie została odwiedzona
      if (!visitedEdges.has(edgeId)) {
        // przechodzimy przez nieodwiedzoną krawędź
        // najpierw oznaczamy ją jako odwiedzoną
        visitedEdges.add(edgeId);
        // i dodajemy na stos wierzchołek do którego prowadzi krawędź
        stack.push(next);
        // dodatkowo oznaczamy, że wierzchołek jeszcze powinniśmy zostawić
        hasVisited = true;
        // i przerywamy wykonanie pętli, żeby przejść do następnego wierzchołka
        break;
      }
    }
    // sprawdzamy, czy odwiedziliśmy jakąś krawędź
    if (!hasVisited) {
      // jeśli nie, to usuwamy wierzchołek ze szczytu stosu
      // i dodajemy go do wyniku
      result.push(stack.pop());
    }
  }
  // zwracamy listę wierzchołków
  return result;
}

// funkcja zwracająca wierzchołki nieparzystego stopnia
function getOddDegreeNodes(edges) {
  // mapa przechowująca stopnie wierzchołków
  const degree = new Map();
  // iterujemy po kolejnych krawędziach
  for (const edge of edges) {
    iterations++;
    // zwiększamy stopnie obu wierzchołków połączonych aktualną krawędzią
    degree.set(edge.from, (degree.get(edge.from) || 0) + 1);
    degree.set(edge.to, (degree.get(edge.to) || 0) + 1);
  }
  // tablica, w której przechowamy wierzchołki nieparzystego stopnia
  const result = [];
  // iterujemy po wszystkich wierzchołkach
  for (const [node, value] of degree) {
    iterations++;
    if (value % 2 !== 0) {
      // dodajemy wierzchołek o nieparzystym stopniu
      result.push(node);
    }
  }
  // zwracamy wynik
  return result;
}

// funkcja przekształcająca cykl Eulera na ścieżkę Hamiltona
// cykl eulera jest zapisany jako lista odwiedzanych po kolei wierzchołków
function convertToHamiltonianPath(nodes) {
  // zbiór przechowujący odwiedzone wierzchołki
  const visited = new Set();
  // zmienna przechowująca wynikową ścieżkę
  const result = [];
  // iterujemy po kolejnych wierzchołkach cyklu Eulera
  for (const node of nodes) {
    iterations++;
    // dodajemy do wyniku tylko nieodwiedzone wierzchołki
    if (!visited.has(node)) {
      result.push(node);
      // pamiętamy, żeby oznaczyć wierzchołek jako odwiedzony
      visited.add(node);
    }
  }
  // zwracamy wynik
  return result;
}

// funkcja do obliczenia długości trasy
function calculatePathLength(nodes) {
  let result = 0;
  // sumujemy w pętli dystanse między kolejnymi wierzchołkami
  for (let i = 0; i < nodes.length - 1; i++) {
    result += distance(nodes[i], nodes[i + 1]);
  }
  return result;
}

// funkcja znajdująca najkrótszą ścieżkę w grafie
// nodes jest typu number[]
function tsp(nodes) {
  iterations = 0;
  const start = performance.now();
  // najpierw budujemy MST
  const tree = mst(nodes);
  // wyciągamy z niego wierzchołki o nieparzystym stopniu
  const oddDegreeNodes = getOddDegreeNodes(tree);
  // i tworzymy pary minimalnego dopssowania doskonałego
  const perfectMatching = perfectMatch(oddDegreeNodes);
  // tworzymy multigraf z MST i dopasowanych par
  const multigraph = [...tree, ...perfectMatching];
  // tworzymy cykl Eulera
  const eulerianCircuit = getEulerianCircuit(multigraph);
  // i przekształcamy go na ścieżkę Hamiltona
  const hamiltonianPath = convertToHamiltonianPath(eulerianCircuit);
  const end = performance.now();
  // dokładamy na koniec ścieżki pierwszy wierzchołek
  const path = [...hamiltonianPath, hamiltonianPath[0]];
  // liczymy długość trasy
  const length = calculatePathLength(path);
  // zwracamy rezultat
  return {
    path,
    length,
    iterations,
    time: end - start,
  };
}

const allVertices = [...nodes.keys()];
for (let i = 2; i <= 12; i++) {
  console.log(`${i} wierzchołków:`, tsp(allVertices.slice(0, i)));
}
