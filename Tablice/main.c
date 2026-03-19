#include <stdio.h>

int main(void) {
  char array[3] = { 0, 1, 2 };
  // deklarujemy tablicę trzyelementową od razu z wartościami
  // wykorzystujemy typ char, ponieważ zajmuje tylko 1 bajt
  
  printf("Adres w pamięci pierwszego elementu: %p \n", array);
  // printf używamy aby wypisać tekst w konsoli
  // pod %p zostaje podstawiona zmienna którą podajemy po przecinku
  // w tym przypadku będzie to wskaźnik na adres tablicy w pamięci

  printf("Zerowy element: %d \n", *(array + 0));
  // aby wyświetlić to co się kryje pod danym adresem pamięci musimy dopisać *
  // tym razem wartość będzie podstawiona pod %d
  // dla ciekawych, czemu raz %d a raz %p, odsyłam do artykułu opisującego funkcję printf: 
  // https://pl.wikibooks.org/wiki/C/printf

  printf("Pierwszy element: %d (adres: %p) \n", *(array + 1), array + 1);
  // tutaj wyświetlimy zarówno element jak i jego adres
  // w prawdziwych zastosowaniach, kod ten uprościłoby się przenosząc wartość wskaźnika do zmiennej

  printf("Drugi element: %d (adres: %p) \n", array[2], array + 2);
  // oczywiście nikt nie każe nam odwoływać się do elementow tablicy w taki sposób
  // tradycyjny sposób odwołania się do elementu tablicy jest przez użycie []
  // array[2] daje ten sam rezultat co *(array + 2)

  return 0;
  // kończymy program przez zwrócenie wartości 0
}