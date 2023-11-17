import { BehaviorSubject } from 'rxjs';
import './style.css';

// tworzymy licznik
const counter = new BehaviorSubject(0);
// tworzymy obserwator
const observer = (value: number) =>
  (document.getElementById(
    'count'
  )!.innerText = `Przycisk kliknięty: ${value} raz(y)`);
// przypisujemy obserwator do licznika
counter.subscribe(observer);
// przypiszmy przyciskowi zdarzenie zwiększania wartości licznika
document
  .getElementById('count-btn')
  ?.addEventListener('click', () => counter.next(counter.getValue() + 1));
