#include <stdio.h>

// źródło: https://www.mcs.anl.gov/~kazutomo/rdtsc.html

unsigned long long int rdtsc(void)
{
   unsigned hi, lo;
 
   __asm__ volatile("RDTSC" : "=a" (hi), "=d" (lo));
 
   return ((unsigned long long)hi) | (((unsigned long long)lo) << 32);;
}

int main(void) {
  for (int i = 0; i < 10; i++) {
    printf("%llu \n", rdtsc());
  }
  return 0;
}