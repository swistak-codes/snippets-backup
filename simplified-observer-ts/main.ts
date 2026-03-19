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
    this.observers = this.observers.filter(x => x !== observer);
  }
  // metoda zwracająca aktualną wartość tematu
  getState() {
    return this.currentState;
  }
  // metoda ustawiająca nową wartość tematu
  setState(newValue: T) {
    this.currentState = newValue;
    // powiadamiamy o zmianie
    this.notify();
  }
  // metoda powiadamiająca obserwatorów o zmianie
  private notify() {
    // iterujemy po wszystkich obserwatorach i wywołujemy w nich update z instancją tematu
    this.observers.forEach(observer => observer(this.getState()));
  }
}

// przykład użycia - zwiększanie w pętli wartości licznika
// tworzymy licznik
const counter = new Subject(0);
// tworzymy obserwator wypisujący wartość w konsoli
const observer: Observer<number> = (value) => console.log(value)
// przypisujemy obserwator do licznika
counter.attach(observer);
// zadziałałoby też prościej:
// counter.attach(console.log);
// pętla zwiększająca wartość licznika
for (let i = 0; i < 10; i++) {
  counter.setState(i);
}
// po uruchomieniu, w konsoli zostaną wypisane kolejne liczby od 0 do 9