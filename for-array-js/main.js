// definiujemy tablicę z elementami
const array = ['element 0', 'abc', '1', 'test'];
// tworzymy pętlę iterującą od 0 do długości tablicy
// pierwszy element ma indeks 0, stąd taki zapis
for (let i = 0; i < array.length; i++) {
  // wypisujemy w konsoli i-ty elment tablicy
  console.log(`${i}: ${array[i]}`);
}