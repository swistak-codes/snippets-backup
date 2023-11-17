import { baseDataStore } from '../state';

// funkcja tworząca widok wyświetlający podstawowe dane o pokemonie
export function createDataView() {
  // pobieramy szablon i go klonujemy
  const clone = document
    .getElementById('data-template')
    .content.cloneNode(true);
  // umieszczamy w widoku
  document.getElementById('root').appendChild(clone);
  const dataElement = document.querySelector('#root > .basic-data');
  // subskrybujemy się na zmiany w baseDataStore w celu ich wyświetlenia
  baseDataStore.observable().subscribe(({ name, height, weight }) => {
    dataElement.querySelector('.name').textContent = name;
    dataElement.querySelector('.height').textContent = height;
    dataElement.querySelector('.weight').textContent = weight;
  });
}
