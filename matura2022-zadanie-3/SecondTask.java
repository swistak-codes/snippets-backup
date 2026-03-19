import java.util.*;

class SecondTask implements Task {
  private static final String resultFormat = "%d %d";

  public String getTaskName() {
    return "3.3.";
  }

  public List<String> doTask(List<Integer> entries) {
    // na początek wykonujemy sito Eratostenesa
    boolean[] sieve = Task.getPrimeNumbers(1000000);
    // zmienne do przechowania wyników
    int maxResult = 0;
    int maxResultNumber = 0;
    int minResult = 1000000;
    int minResultNumber = 0;
    // iterujemy po wszystkich liczbach z zadania
    for (int entry : entries) {
      // interesują nas tylko parzyste
      // w przypadku nieparzystych przechodzimy do kolejnej
      if (entry % 2 != 0) {
        continue;
      }
      // zmienna, która przechowa ile liczba zawiera rozkładów
      int result = 0;
      // iterujemy po wszystkich liczba od 2 do połowy aktualnej liczby
      // od połowy wzwyż będą powtarzać się pary
      for (int i = 2; i <= entry / 2; i++) {
        // jeśli aktualna liczba nie jest pierwsza, przechodzimy dalej
        if (!sieve[i]) {
          continue;
        }
        // drugi składnik sumy będzie różnicą dwóch znanych nam liczb
        int second = entry - i;
        // jeśli drugi składnik jest liczbą pierwszą
        // to inkrementujemy liczbę rozkładów
        if (sieve[second]) {
          result++;
        }
      }
      // jeśli mamy jakiekolwiek rozkłady,
      // to sprawdźmy, czy możemy je przechować
      if (result > 0) {
        // sprawdzamy czy mamy najwięcej rozkładów
        if (result > maxResult) {
          maxResult = result;
          maxResultNumber = entry;
        }
        // sprawdzamy czy mamy najmniej rozkładów
        if (result < minResult) {
          minResult = result;
          minResultNumber = entry;
        }
      }
    }
    return Arrays.asList(String.format(resultFormat, maxResultNumber, maxResult),
        String.format(resultFormat, minResultNumber, minResult));
  }
}