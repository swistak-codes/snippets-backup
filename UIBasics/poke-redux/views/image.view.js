import { store, currentImageSelector } from '../state';
import { NEXT_IMAGE } from '../actions';

// funkcja tworząca widok wyświetlający obrazek z pokemonem
export function createImageView() {
  // pobieramy szablon i go klonujemy
  const clone = document
    .getElementById('image-template')
    .content.cloneNode(true);
  // umieszczamy w widoku
  document.getElementById('root').appendChild(clone);
  const dataElement = document.querySelector('#root > .image-container');
  // subskrybujemy się na zmiany w store w celu ich wyświetlenia
  store.subscribe(() => {
    // wykorzystujemy selektor, aby przetworzył nam dane w stanie na to, co chcemy pokazać
    const url = currentImageSelector(store.getState());
    dataElement.querySelector('.image').setAttribute('src', url);
  });
  // podpinamy akcję zmiany obrazka do przycisku
  dataElement.querySelector('.next-image-btn').addEventListener('click', () => {
    // wysyłamy do dyspozytora akcję bez ładunku
    // store sam wyliczy sobie nowy stan na tej podstawie
    store.dispatch({
      type: NEXT_IMAGE,
    });
  });
}
