// tworzymy generator zwracający trzy ciągi znaków
function* generator() {
  yield '1';
  yield '2-gi element';
  yield '3-ci';
}

// iterujemy po elementach zwracanych przez generator
for (const element of generator()) {
  // wypisujemy aktualny element
  console.log(element);
}