import './style.css';
import { store } from './state';
import { SET_DATA } from './actions';
import { createViews } from './views';

// funkcja rozruchowa aplikacji
async function bootstrapApp() {
  // tworzymy zapytanie do PokeAPI pobierające dane o Pikachu
  const request = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
  // wyciągamy dane zwrócone przez API w formie JSON-a
  const apiData = await request.json();
  // czyścimy aktualną zawartość strony
  document.getElementById('root').innerHTML = '';
  // tworzymy widoki (komponenty)
  createViews();
  // przekazujemy dane z API w akcji do dyspozytora
  store.dispatch({
    type: SET_DATA, // stała przechowująca nazwę akcji
    payload: apiData, // dane pobrane z API
  });
  // zmieniłem kolejność, ponieważ BehaviorSubject z RxJS zwracał nam od razu dane po zasubskrybowaniu
  // natomiast Reduksowy Subscribe informuje tylko o tym, że zaszły zmiany
}

// uruchamiamy aplikację
bootstrapApp();
