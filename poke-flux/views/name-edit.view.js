import { baseDataStore, dispatcher } from '../state';
import { CHANGE_NAME } from '../actions';

// funkcja tworząca widok umożliwiający zmianę nazwy pokemona
export function createNameEditView() {
  // pobieramy szablon i go klonujemy
  const clone = document
    .getElementById('name-edit-template')
    .content.cloneNode(true);
  // umieszczamy w widoku
  document.getElementById('root').appendChild(clone);
  const dataElement = document.querySelector('#root > .name-edit');
  // subskrybujemy się na zmiany w baseDataStore w celu aktualizacji nazwy w inpucie
  baseDataStore.observable().subscribe(({ name }) => {
    dataElement.querySelector('.name-input').value = name;
  });
  // podpinamy akcję zapisu nowej nazwy do przycisku
  dataElement.querySelector('.name-save-btn').addEventListener('click', () => {
    // wysyłamy do dyspozytora akcję bez ładunku
    // store sam wyliczy sobie nowy stan na tej podstawie
    dispatcher.next({
      type: CHANGE_NAME,
      payload: dataElement.querySelector('.name-input').value,
    });
  });
}
