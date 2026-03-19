#include <stdio.h>
#include <complex.h>

int main() {
    double complex z1 = 3.0 + 4.0*I;
    double complex z2 = 1.0 - 2.0*I;
    double complex z3 = z1 + z2;
    printf("%.1f%+.1fi\n", creal(z3), cimag(z3));  // wypisane zostanie: 4.0+2.0i
    return 0;
}