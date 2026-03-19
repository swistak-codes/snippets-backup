#include <stdio.h>

int main(void) {
  // ustawiamy początek licznika na 0
  int number = 0;
  // wykonamy pętlę aż osiągniemy liczbę 10
  while (number < 10) {
    // inkrementujemy liczbę na samym początku
    // gdybyśmy robili to na końcu, wpadlibyśmy w nieskończoną pętlę
    number++;
    // sprawdzamy czy liczba jest parzysta
    if (number % 2 == 0) {
      // wypisujemy tekst
      printf("Liczba %d jest parzysta!\n", number);
      // przerywamy pętlę
      break;
    }
    // wypisujemy tekst dla liczby nieparzystej
    printf("Liczba %d jest nieparzysta!\n", number);
  }
  /*
    Rezultat po uruchomieniu:
      Liczba 1 jest nieparzysta!
      Liczba 2 jest parzysta!
  */
  return 0;
}