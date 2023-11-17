import './style.css';

// typ funkcji obserwatora
// otrzymuje od tematu wartość i nie musi nic zwrócić
type Observer<T> = (value: T) => void;

// klasa tematu to jedyna jaką tworzymy
// <T> to typ generyczny, nie definiujemy jaki dokładnie ma być
class Subject<T> {
  // tablica przechowująca obserwatorów
  private observers: Observer<T>[] = [];
  // aktualny stan obiektu
  private currentState: T;
  // w konstruktorze przekażemy początkową wartość stanu
  constructor(initialState: T) {
    this.currentState = initialState;
  }
  // metoda dołączająca obserwatora
  attach(observer: Observer<T>) {
    // dodajemy obserwatora na koniec tablicy
    this.observers.push(observer);
  }
  // metoda usuwająca obserwatora
  detach(observer: Observer<T>) {
    // odfiltrowujemy obserwatora z tablicy
    this.observers = this.observers.filter((x) => x !== observer);
  }
  // metoda zwracająca aktualną wartość licznika
  getState() {
    return this.currentState;
  }
  // metoda ustawiająca nową wartość licznika
  setState(newValue: T) {
    this.currentState = newValue;
    // powiadamiamy o zmianie
    this.notify();
  }
  // metoda powiadamiająca obserwatorów o zmianie
  protected notify() {
    // iterujemy po wszystkich obserwatorach i wywołujemy w nich update z instancją tematu
    this.observers.forEach((observer) => observer(this.getState()));
  }
}

// tworzymy licznik
const counter = new Subject(0);
// tworzymy obserwator
const observer: Observer<number> = (value) =>
  (document.getElementById(
    'count'
  )!.innerText = `Przycisk kliknięty: ${value} raz(y)`);
// przypisujemy obserwator do licznika
counter.attach(observer);
// przypiszmy przyciskowi zdarzenie zwiększania wartości licznika
document
  .getElementById('count-btn')
  ?.addEventListener('click', () => counter.setState(counter.getState() + 1));
