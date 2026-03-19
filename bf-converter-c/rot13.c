
#include <stdio.h>
#include <stdlib.h>
#include <termios.h>
#include <unistd.h>

int main()
{
  struct termios oldt, newt;
  int ch;
  tcgetattr(STDIN_FILENO, &oldt);
  newt = oldt;
  newt.c_lflag &= ~(ICANON | ECHO);
  tcsetattr(STDIN_FILENO, TCSANOW, &newt);
  
  char memory[30000] = {0};
  char *pointer = memory;
--(*pointer);*pointer = getchar();++(*pointer);while (*pointer) {--(*pointer);while (*pointer) {pointer++;pointer++;++(*pointer);++(*pointer);++(*pointer);++(*pointer);while (*pointer) {pointer++;++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);pointer--;--(*pointer);}pointer--;++(*pointer);pointer--;--(*pointer);while (*pointer) {pointer++;++(*pointer);pointer++;++(*pointer);pointer++;--(*pointer);while (*pointer) {pointer++;pointer++;pointer++;}pointer--;while (*pointer) {while (*pointer) {pointer++;++(*pointer);pointer--;--(*pointer);}pointer++;pointer++;++(*pointer);pointer++;}pointer--;pointer--;pointer--;pointer--;pointer--;--(*pointer);}}pointer++;pointer++;pointer++;while (*pointer) {--(*pointer);}++(*pointer);pointer++;--(*pointer);--(*pointer);while (*pointer) {--(*pointer);while (*pointer) {pointer--;--(*pointer);pointer++;++(*pointer);++(*pointer);++(*pointer);while (*pointer) {--(*pointer);}}}pointer--;while (*pointer) {++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);++(*pointer);pointer--;while (*pointer) {pointer++;--(*pointer);while (*pointer) {pointer++;++(*pointer);pointer++;pointer++;}pointer++;while (*pointer) {++(*pointer);while (*pointer) {pointer--;++(*pointer);pointer++;--(*pointer);}pointer++;++(*pointer);pointer++;pointer++;}pointer--;pointer--;pointer--;pointer--;pointer--;--(*pointer);}pointer++;pointer++;while (*pointer) {pointer--;++(*pointer);pointer++;--(*pointer);}pointer++;while (*pointer) {--(*pointer);while (*pointer) {--(*pointer);pointer--;pointer--;while (*pointer) {--(*pointer);}pointer++;pointer++;}pointer--;pointer--;while (*pointer) {pointer--;pointer--;--(*pointer);pointer++;pointer++;--(*pointer);}pointer++;pointer++;}pointer--;pointer--;while (*pointer) {pointer--;pointer--;++(*pointer);pointer++;pointer++;--(*pointer);}}pointer--;while (*pointer) {--(*pointer);}pointer--;putchar(*pointer);while (*pointer) {--(*pointer);}pointer--;--(*pointer);*pointer = getchar();++(*pointer);}
  tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
  return 0;
}
