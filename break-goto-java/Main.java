class Main {
  public static void main(String[] args) {
    firstLoop: for (int i = 1; i < 10; i++) {
      for (int j = 1; j < 10; j++) {
        if (i * j % 2 == 0) {
          // przerywamy obie pętle
          break firstLoop;
        }
        System.out.println("Break " + i + " " + j);
      }
    }
    // wypisane zostanie tylko 1 1

    secondLoop: for (int i = 1; i < 10; i++) {
      for (int j = 1; j < 10; j++) {
        if (i * j % 2 == 0) {
          // wywołujemy continue na pętli poziom wyżej
          continue secondLoop;
        }
        System.out.println("Continue " + i + " " + j);
      }
    }
    // wypisane zostaną 1 1, 3 1, 5 1, 7 1 i 9 1
  }
}