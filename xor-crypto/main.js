// funkcja przyjmuje tekst do zaszyfrowania/odszyfrowania i klucz
function xorCrypt(text, key) {
  // zmienna przechowująca wynik
  let result = '';
  for (let i = 0; i < text.length; i++) {
    // pobieramy kod ascii znaku na pozycji i
    const code = text.charCodeAt(i);
    // to samo dla klucza, przy czym może być krótszy więc "zapętlamy go"
    // przy użyciu reszty z dzielenia
    const keyCode = key.charCodeAt(i % key.length);
    // obliczamy wartość xor i zamieniamy ją na znak
    const xor = String.fromCharCode(code ^ keyCode);
    // dodajemy do wyniku
    result += xor;
  }
  // zwracamy wynik
  return result;
}

const encrypted = xorCrypt('Bardzo tajny tekst', 'kluczyk');
console.log(encrypted); // nieczytelny wynik
// funkcja działa symetrycznie, więc możemy odszyfrować tak samo
const decrypted = xorCrypt(encrypted, 'kluczyk');
console.log(decrypted); // Bardzo tajny tekst