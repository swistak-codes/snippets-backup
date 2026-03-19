// typ funkcji subskrybenta
// otrzymuje od tematu wartość i nie musi nic zwrócić
type Subscriber<T> = (value: T) => void;

// klasa brokera wiadomości, przerobiony Subject
class Broker<T> {
  // mapa tablic przechowująca subskrybentów dla poszczególnych kanałów
  private subscribers = new Map<string, Subscriber<T>[]>();
  // metoda dołączająca subskrybenta do kanału (odpowiednik attach)
  subscribe(channel: string, subscriber: Subscriber<T>) {
    // pobieramy istniejącą listę subskrybentów dla kanału lub tworzymy nową
    const list = this.subscribers.get(channel) || [];
    // dodajemy subskrybenta do kanału
    list.push(subscriber);
    // aktualizujemy listę w mapie
    this.subscribers.set(channel, list);
  }
  // metoda usuwająca subskrybenta (odpowiednik detach)
  unsubscribe(channel: string, subscriber: Subscriber<T>) {
    // pobieramy istniejącą listę subskrybentów dla kanału lub tworzymy nową
    const list = this.subscribers.get(channel) || [];
    // odfiltrowujemy subskrybenta z tablicy
    this.subscribers.set(channel, list.filter(x => x !== subscriber));
  }
  // metoda wysyłająca wiadomość do subskrybentów (odpowiednik setState)
  sendMessage(channel: string, message: T) {
    // pobieramy istniejącą listę subskrybentów dla kanału
    const list = this.subscribers.get(channel) || [];
    // wysyłamy wiadomość do każdego z listy
    list.forEach(send => send(message));
  }
}

// przykład użycia - zwiększanie w pętli wartości licznika
// wiadomości będziemy wysyłać na dwa różne kanały
// tworzymy centralnego brokera rozsyłającego wiadomości typu number
const numberBroker = new Broker<number>();
// subskrybujemy się, aby wypisać liczby parzyste
numberBroker.subscribe('even', value => console.log('Parzysta', value));
// subskrybujemy się, aby wypisać liczby nieparzyste
numberBroker.subscribe('odd', value => console.log('Nieparzysta', value));
// wysyłamy liczby do brokera w pętli
for (let i = 0; i < 10; i++) {
  // sprawdzamy na podstawie parzystości, na który kanał wysłać liczbę
  const channel = i % 2 === 0 ? 'even' : 'odd'
  numberBroker.sendMessage(channel, i);
}
// po uruchomieniu w konsoli zostaną wypisane kolejne liczby od 0 do 9
// wraz z informacją o parzystości