import './style.css';
import { dispatcher } from './state';
import { SET_DATA } from './actions';
import { createViews } from './views';

// funkcja rozruchowa aplikacji
async function bootstrapApp() {
  // tworzymy zapytanie do PokeAPI pobierające dane o Pikachu
  const request = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
  // wyciągamy dane zwrócone przez API w formie JSON-a
  const apiData = await request.json();
  // przekazujemy dane z API w akcji do dyspozytora
  dispatcher.next({
    type: SET_DATA, // stała przechowująca nazwę akcji
    payload: apiData, // dane pobrane z API
  });
  // czyścimy aktualną zawartość strony
  document.getElementById('root').innerHTML = '';
  // tworzymy widoki (komponenty)
  createViews();
}

// uruchamiamy aplikację
bootstrapApp();
