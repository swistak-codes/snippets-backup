const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const config = {
  moveSpeed: 0.1,
  rotationSpeed: 0.02
};

const state = {
  pos: [11.5, 10.5],
  dir: [-1, 0],
  plane: [0, 0.66],
  map: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,3,0,0,0,3,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,2,0,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  textures: {
    1: { light: '#2ecc71', shadow: '#145c39' },
    2: { light: '#e74c3c', shadow: '#73261e' },
    3: { light: '#3498db', shadow: '#174c6d' } 
  }
};

// obiekt keys będzie przechowywał aktualny stan klawiszy
const keys = {};
// nasłuchujemy zdarzeń klawiatury, aby aktualizować stan klawiszy
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// step wskazuje kierunek ruchu gracza
// 1 - do przodu, -1 - do tyłu
function move(step) {
  // wyciągamy aktualną pozycję gracza
  const [x, y] = state.pos;
  // obliczamy nową pozycję na podstawie kierunku w który patrzy gracz i ustalonej prędkości ruchu
  const newX = x + state.dir[0] * step * config.moveSpeed;
  const newY = y + state.dir[1] * step * config.moveSpeed;
  // sprawdzamy, czy możemy się tam poruszyć (sprawdzenie kolizji ze ścianą)
  if (state.map[Math.floor(newY)][Math.floor(newX)] === 0) {
    // jeśli tak, to aktualizujemy pozycję gracza
    state.pos = [newX, newY];
  }
}

// dir wskazuje kierunek obrotu gracza
// 1 - w lewo, -1 - w prawo
function rotate(dir) {
  // wyciągamy aktualny wektor kierunku
  const [dirX, dirY] = state.dir;
  // oraz wektor płaszczyzny kamery
  const [planeX, planeY] = state.plane;
  // określamy kąt obrotu na podstawie kierunku i ustawionej prędkości rotacji
  // nazwa wynika z faktu, że jest to de facto szybkość obrotu
  const speed = dir * config.rotationSpeed;
  // obracamy wektor kierunku
  state.dir = [
    dirX * Math.cos(speed) - dirY * Math.sin(speed),
    dirX * Math.sin(speed) + dirY * Math.cos(speed)
  ];
  // obracamy również wektor płaszczyzny kamery
  state.plane = [
    planeX * Math.cos(speed) - planeY * Math.sin(speed),
    planeX * Math.sin(speed) + planeY * Math.cos(speed)
  ];
}

function castRay(x) {
  // normalizujemy współrzędne kamery do zakresu [-1, 1]
  const cameraX = 2 * x / canvas.width - 1;
  // obliczamy kierunek promienia na podstawie pozycji kamery
  const rayDir = [
    state.dir[0] + state.plane[0] * cameraX,
    state.dir[1] + state.plane[1] * cameraX
  ];
  // ustalamy współrzędne na mapie, gdzie znajduje się kamera
  // pamiętajmy, że współrzędne mapy są całkowite, a gracza nie, więc zaokrąglamy
  let mapX = Math.floor(state.pos[0]);
  let mapY = Math.floor(state.pos[1]);
  // obliczamy przyrosty w kierunku osi X i Y według wzorów
  const deltaDist = [
    Math.abs(1 / rayDir[0]),
    Math.abs(1 / rayDir[1])
  ];
  // na podstawie kierunku promienia ustalamy krok kierunkowy po mapie
  // oraz odległość boczną, czyli odległość do najbliższej krawędzi komórki
  // najpierw wykonamy to dla osi X
  let stepX, sideDistX;
  if (rayDir[0] < 0) {
    stepX = -1;
    // odległość boczną obliczamy jako różnicę pozycji kamery i krawędzi komórki
    // pomnóżoną przez przyrost w kierunku X
    sideDistX = (state.pos[0] - mapX) * deltaDist[0];
  } else {
    stepX = 1;
    sideDistX = (mapX + 1 - state.pos[0]) * deltaDist[0];
  }
  // teraz dla osi Y
  let stepY, sideDistY;
  if (rayDir[1] < 0) {
    stepY = -1;
    sideDistY = (state.pos[1] - mapY) * deltaDist[1];
  } else {
    stepY = 1;
    sideDistY = (mapY + 1 - state.pos[1]) * deltaDist[1];
  }
  // zaczynamy właściwy algorytm DDA
  // zmienna `hit` będzie oznaczać, czy trafiliśmy w obiekt oraz w jaki
  let hit = 0;
  // zmienna `side` będzie oznaczać, z której strony trafiliśmy
  let side;
  // tak długo, jak nie trafimy w obiekt
  while (hit === 0) {
    // sprawdzamy, czy trafiliśmy w krawędź komórki w osi X czy Y
    if (sideDistX < sideDistY) {
      // jeśli w X, to przesuwamy się w osi X
      sideDistX += deltaDist[0];
      mapX += stepX;
      side = 0;
    } else { 
      // jeśli w Y, to przesuwamy się w osi Y
      sideDistY += deltaDist[1];
      mapY += stepY;
      side = 1;
    }
    // sprawdzamy, czy trafiliśmy w obiekt
    hit = state.map[mapY][mapX];
  }
  // jeśli trafiliśmy, to obliczamy odległość do trafienia
  // w zależności od tego, z której strony trafiliśmy, obliczamy odległość;
  // pamiętamy, że nie liczymy odległości euklidesowej, a tylko wzdłuż osi X lub Y;
  // (1-stepX)/2 to matematyczny trik na obliczenie wartości `offset`
  const distance = side === 0
    ? (mapX - state.pos[0] + (1 - stepX)/2) / rayDir[0]
    : (mapY - state.pos[1] + (1 - stepY)/2) / rayDir[1];
  return { distance, hit, side };
}

function render() {
  // pobieramy wymiary płótna
  const { width, height } = canvas;
  // czyścimy płótno przez narysowanie sufitu
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, width, height/2);
  // oraz podłogi
  ctx.fillStyle = '#34495e';
  ctx.fillRect(0, height/2, width, height/2);
  // iterujemy przez każdy piksel w szerokości płótna
  for (let x = 0; x < width; x++) {
    // rzucamy promień; w wyniku powinniśmy odległość, trafiony obiekt i od której strony trafiliśmy
    const { distance, hit, side } = castRay(x);
    // obliczamy wysokość linii, która będzie reprezentować trafiony obiekt
    const lineHeight = height / distance;
    // na podstawie informacji o trafieniu pobieramy odpowiedni kolor z tekstur
    const color = state.textures[hit];
    // w zależności od strony trafienia ustawiamy kolor cienia lub światła
    ctx.fillStyle = side ? color.light : color.shadow;
    // rysujemy linię na odpowiedniej pozycji
    ctx.fillRect(
      x,
      (height - lineHeight)/2,
      1,
      lineHeight
    );
  }
}

// funkcja do obsługi wejścia z klawiatury
function handleInput() {
  // w zaleności od stanu klawiszy wywołujemy funkcje ruchu i obrotu
  if (keys['w'] || keys['ArrowUp']) move(1);
  if (keys['s'] || keys['ArrowDown']) move(-1);
  if (keys['a'] || keys['ArrowLeft']) rotate(1);
  if (keys['d'] || keys['ArrowRight']) rotate(-1);
}

// główna pętla gry
function gameLoop() {
  // wywołujemy rysowanie
  render();
  // a następnie obsługujemy wejście
  handleInput();
  // i wywołujemy rekurencyjnie następną klatkę
  // requestAnimationFrame wywołuje wskazaną funkcję przy następnym odświeżeniu ekranu
  requestAnimationFrame(gameLoop);
}

// rozpoczynamy pętlę gry
gameLoop();