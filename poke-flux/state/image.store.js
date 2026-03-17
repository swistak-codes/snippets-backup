import { BehaviorSubject } from 'rxjs';
import { SET_DATA, NEXT_IMAGE } from '../actions';

// definiujemy store przechowujący obrazki z pokemonem
export class ImageStore {
  // dane reaktywne przechowujmy wewnętrznie jako RxJSowe BehaviorSubject
  #state = new BehaviorSubject('');
  // pozostałe dane przechowajmy poza RxJS
  #images = [];
  #currentIndex = -1;

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
        this.#images = this.#getImages(action.payload.sprites);
        this.#currentIndex = 0;
        return this.#images[0];
      case NEXT_IMAGE:
        // akcja ma tylko typ, nie zawiera ładunku
        this.#currentIndex = (this.#currentIndex + 1) % this.#images.length;
        return this.#images[this.#currentIndex];
      default:
        // w przypadku innych akcji nie zmieniamy stanu
        return this.#state.getValue();
    }
  }

  // metoda wyciągająca URL obrazków z danych z API
  #getImages(imagesObject, acc = []) {
    // iterujemy po wartościach obiektu
    for (const objValue of Object.values(imagesObject)) {
      if (typeof objValue === 'string') {
        // jeśli jest to string, dodajemy do tablicy wynikowej
        acc.push(objValue);
      } else if (objValue != null && typeof objValue === 'object') {
        // jeśli jest to obiekt, wywołujemy rekurencyjnie funkcję
        this.#getImages(objValue, acc);
      }
    }
    // zwracamy rezultat
    return acc;
  }

  // metoda zwracająca obserwator RxJSowy, do którego widok będzie mógł się zasubskrybować
  observable() {
    // asObservable() zwróci nam obserwator nie mający możliwości zmiany stanu
    return this.#state.asObservable();
  }
}
