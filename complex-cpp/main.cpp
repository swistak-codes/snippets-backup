#include <complex>
#include <iomanip>
#include <iostream>

int main() {
  std::complex<double> z1{3.0, 4.0};  // 3.0 + 4.0i
  std::complex<double> z2{1.0, -2.0}; // 1.0 - 2.0i
  std::complex<double> z3 = z1 + z2;

  double re = z3.real();
  double im = z3.imag();

  std::cout << std::fixed << std::setprecision(1) << re;
  if (im >= 0)
    std::cout << '+';
  std::cout << im << 'i' << '\n'; // wypisane zostanie: 4.0+2.0i

  return 0;
}