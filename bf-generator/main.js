// funkcja generująca kod Brainfuckowy
// zakładam, że text jest typu znakowego
// i zawiera jedynie znaki zawarte w kodowaniu ASCII
function generateBf(text) {
  // zmienna która przechowa docelowy kod
  let code = "";
  // zmienna przechowująca aktualny stan pamięci
  let currentCellValue = 0;

  // iterujemy po każdym znaku w tekście
  for (let i = 0; i < text.length; i++) {
    // wyciągamy znak z tekstu
    let char = text[i];
    // pobieramy jego kod ASCII
    let targetValue = char.charCodeAt(0);
    // obliczamy róznicę z aktualnym stanem pamięci
    let difference = targetValue - currentCellValue;
    if (difference > 0) {
      // jeśli różnica jest większa od 0, to zwiększamy stan plusami
      code += "+".repeat(difference);
    } else if (difference < 0) {
      // jak nie, to zmniejszamy minusami
      // -difference, ponieważ wartość jest ujemna, a chcemy mieć dodatnią liczbę
      code += "-".repeat(-difference);
    }
    // kończymy kropką, czyli wypisaniem znaku
    code += ".";
    // zapamiętujemy aktualny stan pamięci
    currentCellValue = targetValue;
  }
  // zwracamy wygenerowany kod
  return code;
}

console.log(generateBf("Hello World"));
