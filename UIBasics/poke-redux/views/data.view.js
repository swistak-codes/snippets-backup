import { store, baseDataSelector } from '../state';

// funkcja tworząca widok wyświetlający podstawowe dane o pokemonie
export function createDataView() {
  // pobieramy szablon i go klonujemy
  const clone = document
    .getElementById('data-template')
    .content.cloneNode(true);
  // umieszczamy w widoku
  document.getElementById('root').appendChild(clone);
  const dataElement = document.querySelector('#root > .basic-data');
  // subskrybujemy się na zmiany w store w celu ich wyświetlenia
  // warto dodać, że zwykle robi się to bindingami, a nie przez jawne użycie subscribe
  store.subscribe(() => {
    // pobieramy dane ze stanu korzystając z selektora
    const { name, height, weight } = baseDataSelector(store.getState());
    dataElement.querySelector('.name').textContent = name;
    dataElement.querySelector('.height').textContent = height;
    dataElement.querySelector('.weight').textContent = weight;
  });
}
