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
    this.observers = this.observers.filter(x => x !== observer);
  }
  // metoda powiadamiająca obserwatorów o zmianie
  protected notify() {
    // iterujemy po wszystkich obserwatorach i wywołujemy w nich update z instancją tematu
    this.observers.forEach(observer => observer.update(this));
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

// konkretny obserwator, który będzie wypisywać wartość licznika w konsoli
class ConsoleObserver implements Observer {
  // metoda uruchamiana na powiadomieniu o zmianie
  update(subject: CounterSubject) {
    // wypisujemy zmianę z licznika w konsoli
    console.log(subject.getState());
  }
}

// przykład użycia - zwiększanie w pętli wartości licznika
// tworzymy licznik
const counter = new CounterSubject(0);
// tworzymy obserwator
const observer = new ConsoleObserver();
// przypisujemy obserwator do licznika
counter.attach(observer);
// pętla zwiększająca wartość licznika
for (let i = 0; i < 10; i++) {
  counter.setState(i);
}
// po uruchomieniu, w konsoli zostaną wypisane kolejne liczby od 0 do 9