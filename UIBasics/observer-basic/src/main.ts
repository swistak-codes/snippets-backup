import './style.css';

interface Observer {
  update(subject: Subject): void;
}

abstract class Subject {
  // tablica przechowująca obserwatorów
  private observers: Observer[] = [];
  // metoda dołączająca obserwatora
  attach(observer: Observer) {
    // dodajemy obserwatora na koniec tablicy
    this.observers.push(observer);
  }
  // metoda usuwająca obserwatora
  detach(observer: Observer) {
    // odfiltrowujemy obserwatora z tablicy
    this.observers = this.observers.filter((x) => x !== observer);
  }
  // metoda powiadamiająca obserwatorów o zmianie
  protected notify() {
    // iterujemy po wszystkich obserwatorach i wywołujemy w nich update z instancją tematu
    this.observers.forEach((observer) => observer.update(this));
  }
}

// konkretny temat, którym będzie prosty licznik
class CounterSubject extends Subject {
  // aktualna wartość licznika
  private counterState: number;
  // w konstruktorze przekażemy początkową wartość licznika
  constructor(initialState: number) {
    super();
    this.counterState = initialState;
  }
  // metoda zwracająca aktualną wartość licznika
  getState() {
    return this.counterState;
  }
  // metoda ustawiająca nową wartość licznika
  setState(newValue: number) {
    this.counterState = newValue;
    // powiadamiamy o zmianie
    this.notify();
  }
}

// konkretny obserwator, który będzie wypisywać wartość licznika w elemencie HTML
class HtmlElementObserver implements Observer {
  private element: HTMLElement;

  constructor() {
    // pobierzmy element do którego będziemy zapisywać w konstruktorze
    this.element = document.getElementById('count')!;
  }

  // metoda uruchamiana na powiadomieniu o zmianie
  update(subject: CounterSubject) {
    // wypisujemy zmianę z licznika w elemencie
    this.element.innerText = `Przycisk kliknięty: ${subject.getState()} raz(y)`;
  }
}

// tworzymy licznik
const counter = new CounterSubject(0);
// tworzymy obserwator
const observer = new HtmlElementObserver();
// przypisujemy obserwator do licznika
counter.attach(observer);
// przypiszmy przyciskowi zdarzenie zwiększania wartości licznika
document
  .getElementById('count-btn')
  ?.addEventListener('click', () => counter.setState(counter.getState() + 1));
