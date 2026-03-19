#include <iostream>
#include <vector>

using namespace std;

int main()
{
  auto list = new vector<int>();
  // Tworzymy nową listę tablicową
  auto size = list->capacity();
  // W zmiennej size będziemy trzymać aktualny rozmiar tablicy
  // W vector w C++ kryje się on pod funkcją Capacity 
  cout << "Początkowy rozmiar listy: " << size << endl;
  for (int i = 0; i < 200; i++)
  {
    // Robimy pętlę, która wykona się 200 razy
    // Zaczynamy od 0, będzie trwać tak długo aż licznik jest mniejszy od 200
    // I na koniec każdej iteracji zwiększamy licznik o 1
    // i++ to skrócony zapis dla i = i + 1
    list->push_back(i);
    // Dodajemy licznik na koniec listy
    if (list->capacity() != size) {
      // Sprawdzamy czy wielkość tablicy się zmieniła w stosunku do ostatniej
      // Jeżeli jest różna, wtedy wchodzimy w warunek
      size = list->capacity();
      // Zapisujemy aktualny rozmiar tablicy
      cout << "Zmiana rozmiaru na: " << size << " przy " << list->size() << " elementach" << endl;
    }
  }
}