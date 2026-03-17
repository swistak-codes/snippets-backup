import { statsStore, dispatcher } from '../state';
import { DECREASE_STAT, INCREASE_STAT } from '../actions';

// funkcja tworząca widok wyświetlający statystyki pokemona
export function createStatsView() {
  // ten widok będziemy tworzyć całkowicie dynamicznie według zmian stanu
  // subskrybujemy się na zmiany w statsStore
  statsStore.observable().subscribe((stats) => {
    // pobieramy szablon
    const template = document.getElementById('stat-template').content;
    // usuwamy istniejące statystyki
    const current = document.querySelectorAll('#root > .stat');
    for (const element of current) {
      element.remove();
    }
    // iterujemy po statystykach ze stanu
    for (const [name, value] of Object.entries(stats)) {
      // klonujemy szablon
      const clone = template.cloneNode(true);
      // nadajmy klasę z nazwą statystyki pierwszemu elementowi
      clone.children[0].classList.add(name);
      // umieszczamy w widoku
      document.getElementById('root').appendChild(clone);
      // pobieramy element wstawiony do dokumentu
      const dataElement = document.querySelector(`.${name}`);
      // nadajemy wartości
      dataElement.querySelector('.stat-name').textContent = name.replace(
        '-',
        ' '
      );
      dataElement.querySelector('.stat-meter').setAttribute('value', value);
      // ustawiamy akcje dla przycisków
      dataElement
        .querySelector('.stat-minus-btn')
        .addEventListener('click', () => {
          dispatcher.next({
            type: DECREASE_STAT,
            payload: name,
          });
        });
      dataElement
        .querySelector('.stat-plus-btn')
        .addEventListener('click', () => {
          dispatcher.next({
            type: INCREASE_STAT,
            payload: name,
          });
        });
    }
  });
}
