import { BehaviorSubject } from 'rxjs';
import { CHANGE_NAME, SET_DATA } from '../actions';

// definiujemy store przechowujący podstawowe dane
export class BaseDataStore {
  // ogólna uwaga: # oznacza pole/metodę prywatną w JavaScript
  // dane przechowujmy wewnętrznie jako RxJSowe BehaviorSubject
  #state = new BehaviorSubject({
    name: '',
    height: 0,
    weight: 0,
  });

  // aby konstruktor nie był zależny od konkretnej instancji dyspozytora, przekażemy go do konstruktora
  // wykorzystujemy tutaj ideę odwrócenia i wstrzyknięcia zależności
  constructor(dispatcher) {
    // w konstruktorze rejestrujemy się do nasłuchiwania dyspozytora
    dispatcher.subscribe((action) => {
      // ustawiamy następny stan jako wynik funkcji reduktora
      this.#state.next(this.#reduce(action));
    });
  }

  // reduktor czyli funkcja zwracająca nowy stan po wykonaniu akcji
  #reduce(action) {
    switch (action.type) {
      // w zależności od typu zwracamy różne dane
      case SET_DATA:
        // w przypadku ustawienia wszystkich danych zmieniamy całość stanu
        return {
          name: action.payload.name,
          height: action.payload.height,
          weight: action.payload.weight,
        };
      case CHANGE_NAME:
        // w przypadku zmiany nazwy skopiujemy aktualny stan i tylko zmienimy nazwę
        return {
          ...this.#state.getValue(),
          name: action.payload,
        };
      default:
        // w przypadku innych akcji nie zmieniamy stanu
        return this.#state.getValue();
    }
  }

  // metoda zwracająca obserwator RxJSowy, do którego widok będzie mógł się zasubskrybować
  observable() {
    // asObservable() zwróci nam obserwator nie mający możliwości zmiany stanu
    return this.#state.asObservable();
  }
}
