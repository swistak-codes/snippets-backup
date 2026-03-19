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

// funkcja znajdująca ścieżkę algorytmem nearest-neighbor
// nodes jest typu number[], startNode typu number
function nn(nodes, startNode) {
  // zbiór przechowujący odwiedzone wierzchołki, może już przechować startowy
  const visitedNodes = new Set([startNode]);
  // zmienna przechowująca długość ścieżki
  let length = 0;
  // zmienna przechowująca ścieżkę, zaczynamy od startego wierzchołka
  const path = [startNode];
  // iterujemy tak długo, jak są jeszcze nieodwiedzone wierzchołki
  while (visitedNodes.size < nodes.length) {
    // wyciągamy ostatnio odwiedzony wierzchołek
    const lastNode = path.at(-1);
    // zmienne przechowujące aktualne minimum
    let minDistance = Number.POSITIVE_INFINITY;
    let nextNode = null;
    // iterujemy po kolejnych wierzchołkach
    for (let node of nodes) {
      // ignorujemy odwiedzone wierzchołki
      if (visitedNodes.has(node)) {
        continue;
      }
      // sprawdzamy odległość z ostatniego wierzchołka do aktualnego
      const distanceToNode = distance(lastNode, node);
      // jeśli jest to najmniejsza odległość, to zapamiętujemy
      if (distanceToNode < minDistance) {
        minDistance = distanceToNode;
        nextNode = node;
      }
    }
    // dodajemy najbliższy wierzchołek do odwiedzonych
    visitedNodes.add(nextNode);
    // dodajemy do ścieżki
    path.push(nextNode);
    // oraz dodajemy odległość do niego
    length += minDistance;
  }
  // dodajemy odległość do początku
  length += distance(path.at(-1), startNode);
  // zapętlamy ścieżkę do początku
  path.push(startNode);
  // zwracamy wynik
  return {
    length,
    path,
  };
}

// funkcja znajdująca ścieżkę algorytmem recurrent nearest-neighbor
function rnn(nodes) {
  // zmienne przechowujące aktualne minimum
  let currentMinLength = Number.POSITIVE_INFINITY;
  let currentMinPath = [];
  for (const node of nodes) {
    const { length, path } = nn(nodes, node);
    if (length < currentMinLength) {
      currentMinLength = length;
      currentMinPath = path;
    }
  }
  // zwracamy wynik
  return { path: currentMinPath, length: currentMinLength };
}

// losowanie pozycji algorytmem Fishera-Yatesa
function randomOrder(nodes) {
  // wykonujemy kopię wejściowej tablicy
  const result = [...nodes];
  // iterujemy po wszystkich wierzchołkach od tyłu
  for (let i = result.length - 1; i > 0; i--) {
    // losujemy pozycję drugiego wierzchołka
    const j = Math.trunc(Math.random() * (i + 1));
    // zamieniamy je miejscami
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  // zwracamy wynik
  return result;
}

// funkcja wykonująca zamianę 2-opt na nowej tablicy
function toSwapped2opt(nodes, v1, v2) {
  // tworzymy nową tablicę, która będzie mieć wynikową trasę
  const result = new Array(nodes.length);
  // kopiujemy pierwszą część trasy od początku do wierzchołka v1
  for (let i = 0; i <= v1; i++) {
    result[i] = nodes[i];
  }
  // odwracamy segment między wierzchołkami v1+1 a v2
  for (let i = v2, j = v1 + 1; i > v1; i--, j++) {
    result[j] = nodes[i];
  }
  // kopiujemy resztę trasy od v2+1 do końca
  for (let i = v2 + 1; i < nodes.length; i++) {
    result[i] = nodes[i];
  }
  return result;
}

// funkcja zwracająca sąsiednie rozwiązania
function getNeighbors(nodes) {
  // inicjalizujemy pustą tablicę sąsiadów
  const neighbors = [];
  const n = nodes.length;
  // przeglądamy wszystkie możliwe pary (v1, v2) gdzie v2 > v1
  for (let v1 = 0; v1 < n - 1; v1++) {
    for (let v2 = v1 + 1; v2 < n; v2++) {
      // tworzymy nową trasę poprzez zamianę 2-opt
      neighbors.push(toSwapped2opt(nodes, v1, v2));
    }
  }
  return neighbors;
}

// funkcja obliczająca całkowitą długość trasy
function calculateLength(nodes) {
  let result = 0;
  // sumujemy dystanse pomiędzy kolejnymi wierzchołkami
  for (let i = 0; i < nodes.length - 1; i++) {
    result += distance(nodes[i], nodes[i + 1]);
  }
  // dodajemy powrót na początek trasy
  result += distance(nodes.at(-1), nodes[0]);
  // zwracamy wynik
  return result;
}

// funkcja znajdująca prawie najlepszą ścieżkę w grafie przy pomocy steepest-ascent hill-climbing i 2-opt
// nodes jest typu number[] i zakładamy, że jest to początkowy stan od którego zaczynamy
function tsp(nodes) {
  // zmierzymy czas wykonania algorytmu
  const start = performance.now();
  // licznik iteracji
  // drobna uwaga - będziemy zliczać jedynie iteracje hill-climbing, pomijamy liczenie długości trasy i 2-opt
  let iterations = 0;
  // naszą aktualnie najlepszą trasą jest trasa początkowa
  let currentPath = nodes;
  // obliczamy jej długość do porównań
  let currentLength = calculateLength(currentPath);
  // zmienna, która będzie warunkiem skończenia "wspinaczki"
  let hasImproved = true;
  // wykonujemy "wspinaczkę"
  while (hasImproved) {
    // na początek zakładamy z góry, że nie było poprawy
    hasImproved = false;
    // pobieramy wszystkich "sąsiadów" aktualnej trasy
    const neighbors = getNeighbors(currentPath);
    // iterujemy po nich po kolei
    for (const neighbor of neighbors) {
      iterations++;
      // sprawdzamy długość trasy aktualnego sąsiada
      const newDistance = calculateLength(neighbor);
      // jeśli trasa była lepsza...
      if (newDistance < currentLength) {
        // zapamiętujemy ją
        currentPath = neighbor;
        currentLength = newDistance;
        // i zaznaczamy, że było lepsze rozwiązanie, więc będziemy kontynuować wspinaczkę
        hasImproved = true;
        // jeśli w tym momencie zrobilibyśmy `break`, uzyskalibyśmy simple hill climbing
      }
    }
  }
  // dodajemy punkt początkowy do trasy
  currentPath.push(currentPath[0]);
  // koniec pomiaru czasu wykonania
  const end = performance.now();
  // zwracamy najlepszą znalezioną trasę
  return {
    path: currentPath,
    length: currentLength,
    iterations,
    time: end - start,
  };
}

const allVertices = [...nodes.keys()];
console.log("12 wierzchołków. Optymalna długość: 6209");
console.log(
  "Początkowa kolejność wierzchołków:",
  tsp(allVertices.slice(0, 12)),
);
let currentBest = null;
for (let i = 0; i < 100; i++) {
  const result = tsp(randomOrder(allVertices.slice(0, 12)));
  // console.log(`Losowa kolejność, próba ${i + 1}:`, result);
  if (!currentBest || currentBest.length > result.length) {
    currentBest = result;
  }
}
console.log("Najlepsza losowa próba (100 powtórzeń):", currentBest);
console.log("RNN:", tsp(rnn(allVertices.slice(0, 12)).path.slice(0, -1)));
console.log("RNN bez hill-climbing:", rnn(allVertices.slice(0, 12)));
console.log("---");
console.log("Wszystkie wierzchołki (48). Optymalna długość: 10628");
console.log("Początkowa kolejność wierzchołków:", tsp([...allVertices]));
currentBest = null;
for (let i = 0; i < 100; i++) {
  const result = tsp(randomOrder([...allVertices]));
  // console.log(`Losowa kolejność, próba ${i + 1}:`, result);
  if (!currentBest || currentBest.length > result.length) {
    currentBest = result;
  }
}
console.log("Najlepsza losowa próba (100 powtórzeń):", currentBest);
console.log("RNN:", tsp(rnn([...allVertices]).path.slice(0, -1)));
console.log("RNN bez hill-climbing:", rnn([...allVertices]));
