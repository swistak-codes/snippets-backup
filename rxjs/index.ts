import { Subject } from 'rxjs';

// przykład użycia - zwiększanie w pętli wartości licznika
// tworzymy licznik
const counter = new Subject<number>();
// tworzymy obserwator wypisujący wartość w konsoli
const observer = (value: number) => console.log(value)
// przypisujemy obserwator do licznika
counter.subscribe(observer);
// pętla zwiększająca wartość licznika
for (let i = 0; i < 10; i++) {
  counter.next(i);
}
// po uruchomieniu, w konsoli zostaną wypisane kolejne liczby od 0 do 9