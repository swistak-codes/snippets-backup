class Complex {
  // nową liczbę zespoloną tworzymy podając część rzeczywistą i urojoną
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  // dodawanie dwóch liczb zespolonych
  add(other) {
    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  // odejmowanie dwóch liczb zespolonych
  subtract(other) {
    return new Complex(this.real - other.real, this.imag - other.imag);
  }

  // mnożenie dwóch liczb zespolonych
  // wykorzystujemy tutaj wzór z iloczynu wektorowego, aby nie obliczać specjalnie modułu i argumentu
  multiply(other) {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }

  // dzielenie dwóch liczb zespolonych
  divide(other) {
    const denom = other.real ** 2 + other.imag ** 2;
    return new Complex(
      (this.real * other.real + this.imag * other.imag) / denom,
      (this.imag * other.real - this.real * other.imag) / denom
    );
  }

  // obliczanie modułu liczby zespolonej
  modulus() {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  // obliczanie argumentu liczby zespolonej
  argument() {
    return Math.atan2(this.imag, this.real);
  }

  // reprezentacja tekstowa liczby zespolonej
  toString() {
    return `${this.real} + ${this.imag}i`;
  }
}

const z1 = new Complex(3, 4);  // 3 + 4i
const z2 = new Complex(1, -2); // 1 - 2i
const z3 = z1.add(z2);
console.log(z3.toString()); // wypisane zostanie: 4 + 2i
console.log(z3.modulus());   // wypisane zostanie: 4.47213595499958
console.log(z3.argument());  // wypisane zostanie: 0.4636476090008061