import './style.css';

// dla uproszczenia wyciągnijmy do zmiennych elementy widoku
const counter = document.getElementById('counter');
const increaseBtn = document.getElementById('increase');
const sendBtn = document.getElementById('send-to-child');
const child = document.getElementById('child-frame');

// tworzymy nasłuchiwanie na własne zdarzenie 'increase'
// utworzymy je w obiekcie dokumentu
document.addEventListener('increase', () => {
  // pobieramy aktualną zawartość licznika
  const value = parseInt(counter.innerText);
  // wyświetlamy zwiększoną wartość
  counter.innerText = value + 1;
});

// dodajemy nasłuchiwanie na zdarzenie kliknięcia
// na przycisku zwiększania licznika
// zrobimy to w jego dyspozytorze zdarzeń
increaseBtn.addEventListener('click', () => {
  // prześlijmy do dyspozytora zdarzeń własne zdarzenie 'increase'
  document.dispatchEvent(new CustomEvent('increase'));
});

// analogicznie jak wyżej dla przycisku przesłania
sendBtn.addEventListener('click', () => {
  // wyślijmy wiadomość do ramki (na zewnątrz)
  // prześlemy zawartość licznika
  child.contentWindow.postMessage(counter.innerText);
});
