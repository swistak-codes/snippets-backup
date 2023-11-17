// typ funkcji obserwatora
// otrzymuje od tematu wartość i nie musi nic zwrócić
typealias Observer<T> = (T) -> Unit

class Subject<T>(initialState: T) {
  // lista przechowująca obserwatorów
  private val observers = ArrayList<Observer<T>>()
  // aktualna wartość licznika
  private var currentState: T = initialState
  // metoda dołączająca obserwatora
  fun attach(observer: Observer<T>) {
    // dodajemy obserwatora na koniec listy
    this.observers.add(observer)
  }
  // metoda usuwająca obserwatora
  fun detach(observer: Observer<T>) {
    // odfiltrowujemy obserwatora z tablicy
    this.observers.remove(observer)
  }
  // metoda zwracająca aktualną wartość licznika
  fun getState(): T {
    return this.currentState
  }
  // metoda ustawiająca nową wartość licznika
  fun setState(newValue: T) {
    this.currentState = newValue
    // powiadamiamy o zmianie
    this.notifyObservers()
  }
  // metoda powiadamiająca obserwatorów o zmianie
  protected fun notifyObservers() {
    // iterujemy po wszystkich obserwatorach i wywołujemy w nich update z instancją tematu
    this.observers.forEach { it(this.getState()) }
  }
}

fun main() {
  // przykład użycia - zwiększanie w pętli wartości licznika
  // tworzymy licznik
  val counter = Subject<Int>(0)
  // tworzymy obserwator
  val observer: Observer<Int> = { println(it) }
  // przypisujemy obserwator do licznika
  counter.attach(observer)
  // pętla zwiększająca wartość licznika
  for (i in 0..9) {
    counter.setState(i)
  }
  // po uruchomieniu, w konsoli zostaną wypisane kolejne liczby od 0 do 9
}
