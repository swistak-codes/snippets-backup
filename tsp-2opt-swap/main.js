// funkcja wykonująca zamianę 2-opt w oryginalnej tablicy
function swap2opt(nodes, v1, v2) {
  // interesują nas wierzchołki od v1+1, więc od razu inkrementujemy
  v1++;
  // odwracamy segment między wierzchołkami v1 a v2
  while (v1 < v2) {
    // zamiana wierzchołków
    let temp = nodes[v1];
    nodes[v1] = nodes[v2];
    nodes[v2] = temp;
    // przesuwamy indeksy
    v1++;
    v2--;
  }
  return nodes;
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

console.log(swap2opt([0, 1, 2, 3, 4, 5, 6, 7, 8], 2, 7));
console.log(toSwapped2opt([0, 1, 2, 3, 4, 5, 6, 7, 8], 2, 7));
