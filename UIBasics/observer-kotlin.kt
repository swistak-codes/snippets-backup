interface Observer<T : Subject> {
  fun update(subject: T)
}

abstract class Subject {
  // lista przechowująca obserwatorów
  private val observers = ArrayList<Observer<Subject>>()
  // metoda dołączająca obserwatora
  fun attach(observer: Observer<Subject>) {
    // dodajemy obserwatora na koniec listy
    this.observers.add(observer)
  }
  // metoda usuwająca obserwatora
  fun detach(observer: Observer<Subject>) {
    // odfiltrowujemy obserwatora z tablicy
    this.observers.remove(observer)
  }
  // metoda powiadamiająca obserwatorów o zmianie
  protected fun notifyObservers() {
    // iterujemy po wszystkich obserwatorach i wywołujemy w nich update z instancją tematu
    this.observers.forEach { it.update(this) }
  }
}

// konkretny temat, którym będzie prosty licznik
class CounterSubject(initialState: Int) : Subject() {
  // aktualna wartość licznika
  private var counterState: Int = initialState
  // metoda zwracająca aktualną wartość licznika
  fun getState(): Int {
    return this.counterState
  }
  // metoda ustawiająca nową wartość licznika
  fun setState(newValue: Int) {
    this.counterState = newValue
    // powiadamiamy o zmianie
    this.notifyObservers()
  }
}

// konkretny obserwator, który będzie wypisywać wartość licznika w konsoli
class ConsoleObserver : Observer<CounterSubject> {
  // metoda uruchamiana na powiadomieniu o zmianie
  override fun update(subject: CounterSubject) {
    // wypisujemy zmianę z licznika w konsoli
    println(subject.getState())
  }
}

fun main() {
  // przykład użycia - zwiększanie w pętli wartości licznika
  // tworzymy licznik
  val counter = CounterSubject(0)
  // tworzymy obserwator
  val observer = ConsoleObserver() as Observer<Subject>
  // przypisujemy obserwator do licznika
  counter.attach(observer)
  // pętla zwiększająca wartość licznika
  for (i in 0..9) {
    counter.setState(i)
  }
  // po uruchomieniu, w konsoli zostaną wypisane kolejne liczby od 0 do 9
}
