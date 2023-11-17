import { imageStore, dispatcher } from '../state';
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
  // subskrybujemy się na zmiany w imageStore w celu ich wyświetlenia
  imageStore.observable().subscribe((url) => {
    dataElement.querySelector('.image').setAttribute('src', url);
  });
  // podpinamy akcję zmiany obrazka do przycisku
  dataElement.querySelector('.next-image-btn').addEventListener('click', () => {
    // wysyłamy do dyspozytora akcję bez ładunku
    // store sam wyliczy sobie nowy stan na tej podstawie
    dispatcher.next({
      type: NEXT_IMAGE,
    });
  });
}
