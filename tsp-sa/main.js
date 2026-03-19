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

// funkcja temperatury - logarytmiczna
function temperature(progress) {
  return 1 / Math.log(1 + progress * 9);
}

// funkcja zwracająca losowego sąsiada aktualnej trasy
// nodes to tablica wierzchołków
function getRandomNeighbor(nodes) {
  // dla ułatwienia pobieramy sobie liczbę wierzchołków
  const n = nodes.length;
  // wybieramy losowe krawędzie v1 i v2 do zamiany 2-opt
  // obie wartości mają być w przedziale 0 do n-2
  let v1 = Math.floor(Math.random() * (n - 1));
  let v2 = Math.floor(Math.random() * (n - 1));
  // jeśli obie liczby wylosowały nam się takie same, to powtarzamy losowanie
  while (v1 === v2) {
    v2 = Math.floor(Math.random() * (n - 1));
  }
  // teraz, jeśli v1 jest większe od v2, to zamieniamy je miejscami
  if (v1 > v2) {
    let temp = v1;
    v1 = v2;
    v2 = temp;
  }
  // zwracamy nową trasę z wykonaną zamianą 2-opt
  return toSwapped2opt(nodes, v1, v2);
}

// funkcja znajdująca prawie najlepszą ścieżkę w grafie przy pomocy symulowanego wyżarzania i 2-opt
// nodes jest typu number[] i zakładamy, że jest to początkowy stan od którego zaczynamy
// initialT to początkowa wartość temperatury typu number
// kmax to limit liczby iteracji, również typu number
function tsp(nodes, initialT, kmax) {
  // zmierzymy czas wykonania algorytmu
  const start = performance.now();
  // licznik iteracji
  // drobna uwaga - będziemy zliczać jedynie iteracje hill-climbing, pomijamy liczenie długości trasy i 2-opt
  let iterations = 0;
  // naszą aktualnie najlepszą trasą jest trasa początkowa
  let currentPath = nodes;
  // obliczamy jej długość do porównań
  let currentLength = calculateLength(currentPath);
  // najlepsza napotkana trasa
  let globalBestPath = currentPath;
  let globalBestLength = currentLength;
  // pętla, w której wykonujemy symulowane wyżarzanie
  for (let i = 0; i < kmax; i++) {
    iterations++;
    // obliczamy aktualną temperaturę układu
    const t = initialT * temperature((i + 1) / kmax);
    // pobieramy losowego sąsiada aktualnej trasy
    const neighbor = getRandomNeighbor(currentPath);
    // obliczamy jego długość
    const neighborLength = calculateLength(neighbor);
    // liczymy różnicę między długościami
    const delta = neighborLength - currentLength;
    // ustawiamy sąsiada jako nową najlepszą trasę, jeśli:
    // - trasa jest krótsza (ujemna delta)
    // - wylosowana liczba jest mniejsza od obliczonego prawdopodobieństwa
    if (delta < 0 || Math.exp(-delta / t) >= Math.random()) {
      currentPath = neighbor;
      currentLength = neighborLength;
      if (currentLength < globalBestLength) {
        globalBestPath = currentPath;
        globalBestLength = currentLength;
      }
    }
  }
  // dodajemy startowy wierzchołek do końca trasy
  globalBestPath.push(globalBestPath[0]);
  // koniec pomiaru czasu wykonania
  const end = performance.now();
  // zwracamy najlepszą znalezioną trasę
  return {
    path: globalBestPath,
    length: globalBestLength,
    iterations,
    time: end - start,
  };
}

const ITERATIONS = 20000;
const INITIAL_T = 100;

const allVertices = [...nodes.keys()];
console.log("12 wierzchołków. Optymalna długość: 6209");
console.log(
  "Początkowa kolejność wierzchołków:",
  tsp(allVertices.slice(0, 12), INITIAL_T, ITERATIONS),
);
let currentBest = null;
for (let i = 0; i < 100; i++) {
  const result = tsp(
    randomOrder(allVertices.slice(0, 12)),
    INITIAL_T,
    ITERATIONS,
  );
  // console.log(`Losowa kolejność, próba ${i + 1}:`, result);
  if (!currentBest || currentBest.length > result.length) {
    currentBest = result;
  }
}
console.log("Najlepsza losowa próba (100 powtórzeń):", currentBest);
console.log(
  "RNN:",
  tsp(rnn(allVertices.slice(0, 12)).path.slice(0, -1), INITIAL_T, ITERATIONS),
);
console.log(
  "RNN bez hill-climbing:",
  rnn(allVertices.slice(0, 12), INITIAL_T, ITERATIONS),
);
console.log("---");
console.log("Wszystkie wierzchołki (48). Optymalna długość: 10628");
console.log(
  "Początkowa kolejność wierzchołków:",
  tsp([...allVertices], INITIAL_T, ITERATIONS),
);
currentBest = null;
for (let i = 0; i < 100; i++) {
  const result = tsp(randomOrder([...allVertices]), INITIAL_T, ITERATIONS);
  // console.log(`Losowa kolejność, próba ${i + 1}:`, result);
  if (!currentBest || currentBest.length > result.length) {
    currentBest = result;
  }
}
console.log("Najlepsza losowa próba (100 powtórzeń):", currentBest);
console.log(
  "RNN:",
  tsp(rnn([...allVertices]).path.slice(0, -1), INITIAL_T, ITERATIONS),
);
console.log(
  "RNN bez hill-climbing:",
  rnn([...allVertices], INITIAL_T, ITERATIONS),
);
