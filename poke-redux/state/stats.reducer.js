import { SET_DATA, DECREASE_STAT, INCREASE_STAT } from '../actions';

// zmienna przechowująca początkowy wycinek statnu ze statystykami
const initialStatsState = {};

// funkcja konwertująca tablicę obiektów statystyk na obiekt
function parseStats(statsArray) {
  const result = {};
  // iterujemy po tablicy
  for (const stat of statsArray) {
    // dodajemy statystykę do obiektu
    result[stat.stat.name] = stat.base_stat;
  }
  return result;
}

// odpowiednik fluksowego store przechowującego statystyki pokemona
export function statsReducer(state = initialStatsState, action) {
  switch (action.type) {
    // w zależności od typu zwracamy różne dane
    case SET_DATA:
      return parseStats(action.payload.stats);
    case INCREASE_STAT:
      return {
        ...state,
        // w ładunku spodziewamy się nazwy statystyki do edycji
        // maksymalna wartość to 100
        [action.payload]: Math.min(state[action.payload] + 1, 100),
      };
    case DECREASE_STAT:
      return {
        ...state,
        // minimalna wartość to 0
        [action.payload]: Math.max(state[action.payload] - 1, 0),
      };
    default:
      // w przypadku innych akcji nie zmieniamy stanu
      return state;
  }
}
