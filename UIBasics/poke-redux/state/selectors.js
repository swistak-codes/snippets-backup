// dla uproszczenia pracy z Reduksem tworzy się selektory
// pobierające wybrane dane ze stanu

// selektor pobierający ze stanu podstawowe dane o pokemonie
export function baseDataSelector(state) {
  // w tym przypadku możemy zwrócić po prostu surowy stan
  return state.baseData;
}

// selektor pobierający aktualny obrazek
export function currentImageSelector(state) {
  // w tym przypadku przekształcimy stan do odpowiedniej postaci
  // aby zwrócić URL obrazka wskazywanego przez currentIndex
  return state.images.urls[state.images.currentIndex];
}

// selektor pobierający statystyki pokemona
export function statsSelector(state) {
  return state.stats;
}
