import java.util.*;

class FirstTask implements Task {
  public String getTaskName() {
    return "3.2.";
  }

  public List<String> doTask(List<Integer> entries) {
    int result = 0;
    boolean[] sieve = Task.getPrimeNumbers(1000000);
    for (int number : entries) {
      if (sieve[number - 1]) {
        result++;
      }
    }
    return Arrays.asList(Integer.toString(result));
  }
}