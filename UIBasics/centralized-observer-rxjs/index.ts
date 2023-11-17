import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// typ wiadomości przesyłanej do RxJS
type Message = {
  channel: string;
  message: number;
}
// tworzymy centralny temat
const centralSubject = new Subject<Message>();
// zróbmy funkcję do wysyłania wiadomości
function sendMessage(channel: string, message: number) {
  // przesyłamy wiadomość do tematu RxJSowego
  centralSubject.next({ channel, message });
}
// przyda się nam też funkcja zwracająca przefiltrowany obserwator
function channel(name: string) {
  // zwracamy obserwator, który zawiera tylko wiadomości wskazanego typu
  // od razu też przemapowane, aby ukryć wewnętrzną strukturę
  return centralSubject.pipe(
    filter(msg => msg.channel === name),
    map(msg => msg.message)
  );
}
// przykład użycia - zwiększanie w pętli wartości licznika
// wiadomości będziemy wysyłać na dwa różne kanały
// subskrybujemy się, aby wypisać liczby parzyste
channel('even').subscribe(value => console.log('Parzysta', value));
// subskrybujemy się, aby wypisać liczby nieparzyste
channel('odd').subscribe(value => console.log('Nieparzysta', value));
// wysyłamy liczby do brokera w pętli
for (let i = 0; i < 10; i++) {
  // sprawdzamy na podstawie parzystości, na który kanał wysłać liczbę
  const channel = i % 2 === 0 ? 'even' : 'odd'
  sendMessage(channel, i);
}
// po uruchomieniu w konsoli zostaną wypisane kolejne liczby od 0 do 9
// wraz z informacją o parzystości