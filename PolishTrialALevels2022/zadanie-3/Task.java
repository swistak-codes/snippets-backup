import java.util.*;
import java.lang.Math;

interface Task {
  String getTaskName();

  List<String> doTask(List<Integer> entries);

  public static boolean[] getPrimeNumbers(int N) {
    boolean[] sieve = new boolean[N + 1];
    sieve[0] = false;
    sieve[1] = false;
    for (int i = 2; i <= N; i++) {
      sieve[i] = true;
    }
    for (int i = 2; i <= Math.sqrt(N); i++) {
      if (sieve[i]) {
        int j = i * i;
        while (j <= N) {
          sieve[j] = false;
          j += i;
        }
      }
    }
    return sieve;
  }
}