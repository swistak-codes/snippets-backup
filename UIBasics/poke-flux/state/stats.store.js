import { BehaviorSubject } from 'rxjs';
import { SET_DATA, DECREASE_STAT, INCREASE_STAT } from '../actions';

// definiujemy store przechowujący statystyki pokemona
export class StatsStore {
  // dane reaktywne przechowujmy wewnętrznie jako RxJSowe BehaviorSubject
  #state = new BehaviorSubject({});

  constructor(dispatcher) {
    // w konstruktorze rejestrujemy się do nasłuchiwania dyspozytora
    dispatcher.subscribe((action) => {
      // ustawiamy następny stan jako wynik funkcji reduktora
      this.#state.next(this.#reduce(action));
    });
  }

  // reduktor czyli funkcja zwracająca nowy stan po wykonaniu akcji
  #reduce(action) {
    // dla ułatwienia pobieramy aktualny stan do zmiennej
    const currentState = this.#state.getValue();
    switch (action.type) {
      // w zależności od typu zwracamy różne dane
      case SET_DATA:
        return this.#parseStats(action.payload.stats);
      case INCREASE_STAT:
        return {
          ...currentState,
          // w ładunku spodziewamy się nazwy statystyki do edycji
          // maksymalna wartość to 100
          [action.payload]: Math.min(currentState[action.payload] + 1, 100),
        };
      case DECREASE_STAT:
        return {
          ...currentState,
          // minimalna wartość to 0
          [action.payload]: Math.max(currentState[action.payload] - 1, 0),
        };
      default:
        // w przypadku innych akcji nie zmieniamy stanu
        return currentState;
    }
  }

  // metoda konwertująca tablicę obiektów statystyk na obiekt
  #parseStats(statsArray) {
    const result = {};
    // iterujemy po tablicy
    for (const stat of statsArray) {
      // dodajemy statystykę do obiektu
      result[stat.stat.name] = stat.base_stat;
    }
    return result;
  }

  // metoda zwracająca obserwator RxJSowy, do którego widok będzie mógł się zasubskrybować
  observable() {
    // asObservable() zwróci nam obserwator nie mający możliwości zmiany stanu
    return this.#state.asObservable();
  }
}
