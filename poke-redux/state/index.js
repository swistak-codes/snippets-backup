import { createStore, combineReducers } from 'redux';
import { baseDataReducer } from './base-data.reducer';
import { imagesReducer } from './images.reducer';
import { statsReducer } from './stats.reducer';

// złączamy nasze reduktory w jeden za pomocą funkcji combineReducers
const reducer = combineReducers({
  baseData: baseDataReducer,
  images: imagesReducer,
  stats: statsReducer,
});

// tworzymy reduksowy store przy użyciu funkcji createStore
export const store = createStore(reducer);
// funkcja w aktualnej wersji Reduksa jest oznaczona jako "deprecated"
// jednak jest to tylko dlatego, że twórcy biblioteki zachęcają do korzystania z Redux Toolkit

// reeksportujemy selektory z pliku selectors.js aby mieć do nich prosty dostęp
export * from './selectors';
