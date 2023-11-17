// typ funkcji, dla uproszczenia kodu
type Fn = () => void;
// obserwator do zarejestrowania
let toRegister: Fn | undefined = undefined;
// funkcja tworząca signal, czyli odpowiednik tematu
const createSignal = <T>(initialValue: T) => {
  // aktualny stan obiektu
  let currentState = initialValue;
  // tablica przechowująca obserwatorów
  const observers: Fn[] = [];
  // funkcja powiadamiająca obserwatorów o zmianie
  const notify = () => {
    // iterujemy po wszystkich obserwatorach powiadamiając o zmianie
    observers.forEach(observer => observer());
  }
  // funkcja zwracająca aktualną wartość sygnału
  const getState = () => {
    // przy pierwszym uruchomieniu dodajmy obserwator
    if (toRegister) {
      observers.push(toRegister);
    }
    return currentState;
  }
  // funkcja ustawiająca nową wartość sygnału
  const setState = (newValue: T) => {
    currentState = newValue;
    // powiadamiamy o nowej wartości
    notify();
  }
  // zwracamy funkcję do pobierania i ustawiania stanu
  return [getState, setState];
}
// funkcja tworząca efekt, czyli odpowiednik obserwatora
const effect = (callback: Fn) => {
  // przy pierwszym wywołaniu efektu rejestrujemy go
  toRegister = callback;
  // wywołujemy
  callback();
  // możemy już usunąć z kolejki do rejestracji
  toRegister = undefined;
}

// przykład użycia - zwiększanie w pętli wartości licznika
// tworzymy sygnał przechowujący stan licznika
const [count, setCount] = createSignal(0);
// tworzymy efekt wypisujący w konsoli wartość licznika
effect(() => console.log(count()));
// pętla zwiększająca wartość licznika
for (let i = 0; i < 10; i++) {
  setCount(i)
}
// po uruchomieniu, w konsoli zostaną wypisane kolejne liczby od 0 do 9
// ze względu na działanie, że efekt jest wywoływany od razu, 0 będzie powtórzone