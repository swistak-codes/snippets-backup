import { SET_DATA, NEXT_IMAGE } from '../actions';

// zmienna przechowująca początkowy wycinek stanu opiekowany przez imageReducer
// zwróć uwagę na inną strukturę — w Reduksie raczej nie chowamy rzeczy poza stanem;
// wszystko trzymamy wewnątrz jego, a dopiero na poziomie selektorów decydujemy
// co dany widok może interesować
const initialImagesState = {
  urls: [],
  currentIndex: -1,
};

// funkcja pomocnicza wyciągająca URL obrazków z danych z API
function getImages(imagesObject, acc = []) {
  // iterujemy po wartościach obiektu
  for (const objValue of Object.values(imagesObject)) {
    if (typeof objValue === 'string') {
      // jeśli jest to string, dodajemy do tablicy wynikowej
      acc.push(objValue);
    } else if (objValue != null && typeof objValue === 'object') {
      // jeśli jest to obiekt, wywołujemy rekurencyjnie funkcję
      getImages(objValue, acc);
    }
  }
  // zwracamy rezultat
  return acc;
}

// odpowiednik fluksowego store przechowującego obrazki z pokemonem
export function imagesReducer(state = initialImagesState, action) {
  switch (action.type) {
    // w zależności od typu zwracamy różne dane
    case SET_DATA:
      return {
        urls: getImages(action.payload.sprites),
        currentIndex: 0,
      };
    case NEXT_IMAGE:
      // akcja ma tylko typ, nie zawiera ładunku
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % state.urls.length,
      };
    default:
      // w przypadku innych akcji nie zmieniamy stanu
      return state;
  }
}
