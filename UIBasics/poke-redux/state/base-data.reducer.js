import { CHANGE_NAME, SET_DATA } from '../actions';

// zmienna przechowująca początkowy wycinek stanu opiekowany przez baseDataReducer
const initialBaseDataState = {
  name: '',
  height: 0,
  weight: 0,
};

// odpowiednik Fluksowego store przechowującego podstawowe dane
// reduktor baseDataReducer przyjmuje swój wycinek stanu jako akumulator oraz akcję
// zwróć uwagę, że jest to zwykła funkcja, bez zależności od Reduksa
export function baseDataReducer(state = initialBaseDataState, action) {
  // zauważ, że reduktor wygląda dokładnie tak samo, jak ten, który napisaliśmy we Fluksie
  // zrobiłem to specjalnie, aby pokazać podobieństwo;
  // jedyna różnica jest taka, że tutaj mamy do czyniena z prawdziwym reduktorem,
  // czyli funkcja jest niezależna od żadnej zewnętrznej zmiennej ze stanem
  switch (action.type) {
    case SET_DATA:
      return {
        name: action.payload.name,
        height: action.payload.height,
        weight: action.payload.weight,
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
