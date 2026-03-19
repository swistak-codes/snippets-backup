const CLOUDY = 1;
const HOT = 2;
const WINDY = 4;

// ustawiamy, że aktualnie jest ciepło, ale też wietrznie
let weather = HOT | WINDY;
// sprawdźmy, czy jest pochmurnie i wypiszmy rezultat
console.log('Czy jest pochmurnie?', (weather & CLOUDY) === CLOUDY);
// Czy jest pochmurnie? false

// ustawmy, że jednak jest pochmurnie:
weather = weather | CLOUDY;
// ponownie sprawdźmy, czy jest pochmurnie:
console.log('Czy jest pochmurnie?', (weather & CLOUDY) === CLOUDY);
// Czy jest pochmurnie? true

// jednak stwierdzamy, że nie jest pochmurnie, to resetujemy wartość:
weather = weather & ~CLOUDY;
// sprawdźmy wartość jeszcze raz
console.log('Czy jest pochmurnie?', (weather & CLOUDY) === CLOUDY);
// Czy jest pochmurnie? false