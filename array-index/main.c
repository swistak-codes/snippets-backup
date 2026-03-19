#include <stdio.h>

int main(void) {
  int array[] = {21, 22, 23, 24, 25};
  printf("array[3]: %d\n", array[3]);  // 24
  printf("3[array]: %d\n", 3 [array]); // 24
  // wyjasnienie
  printf("*(array + 3): %d\n", *(array + 3)); // 24
  printf("*(3 + array): %d\n", *(3 + array)); // 24
  printf("%d\n", array[3] == *(array + 3));   // 1
  printf("%d\n", 3 [array] == *(3 + array));  // 1
  // eksperyment
  int indexes[] = {4, 3, 2, 1, 0};
  printf("indexes[1][array]: %d\n", indexes[1][array]); // 24
  printf("array[indexes[1]]: %d\n", array[indexes[1]]); // 24
  return 0;
}