import io.reactivex.rxjava3.subjects.PublishSubject

fun main() {
    // przykład użycia - zwiększanie w pętli wartości licznika
    // tworzymy licznik
    val counter = PublishSubject.create<Int>()
    // przypisujemy obserwator do licznika
    counter.subscribe { println(it) }
    // pętla zwiększająca wartość licznika
    for (i in 0..9) {
        counter.onNext(i)
    }
    // po uruchomieniu, w konsoli zostaną wypisane kolejne liczby od 0 do 9
}