#include <iostream>
#include <vector>

using namespace std;

int main() {
  // deklarujemy listę tablicową z trzema elementami
  auto list = vector<string>{"1", "2-gi element", "3-ci"};
  // iterujemy od początku, do końca, przeskakując co jeden element
  // begin() pobiera iterator
  // end() zawiera końcową pozycję
  // it++ przesuwa na następny element
  for (auto it = list.begin(); it < list.end(); it++) {
    // wypisujemy aktualną wartość
    cout << *it << "\n";
  }
}